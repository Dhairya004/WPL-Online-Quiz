document.addEventListener("DOMContentLoaded", async function () {
  const topic = window.APP_DATA && window.APP_DATA.topic;

  const mapping = {
    gk: "General Knowledge",
    science: "Science",
    sports: "Sports",
    sciencefiction: "Science Fiction",
    currentaffairs: "Current Affairs",
    environment: "Environment",
  };

  const topicName = mapping[topic] || "General Knowledge";
  const topicNameElement = document.querySelector(".topic-name");
  const form = document.getElementById("myForm");

  if (topicNameElement) {
    topicNameElement.innerText = topicName;
  }

  if (!form) {
    return;
  }

  try {
    const response = await fetch("/js/questions.json");
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const questions = await response.json();
    const topicQuestions = questions[topicName] || [];

    topicQuestions.forEach((element, index) => {
      const questionWrapper = document.createElement("div");
      questionWrapper.classList.add("question-wrapper");

      const questionElement = document.createElement("p");
      questionElement.innerText = element.question;

      const optionsWrapper = document.createElement("fieldset");
			optionsWrapper.style.padding = "0";
      optionsWrapper.style.marginBottom = "20px";

      element.options.forEach((option, optionIndex) => {
        const optionId = `q${index}_o${optionIndex}`;

        const optionElement = document.createElement("input");
        optionElement.type = "radio";
        optionElement.name = `q${index}`;
        optionElement.id = optionId;
        optionElement.value = optionIndex;

        const label = document.createElement("label");
        label.setAttribute("for", optionId);
        label.innerText = option;

        optionsWrapper.appendChild(optionElement);
        optionsWrapper.appendChild(label);
        optionsWrapper.appendChild(document.createElement("br"));
      });

      questionWrapper.appendChild(questionElement);
      questionWrapper.appendChild(optionsWrapper);
      form.appendChild(questionWrapper);
    });
      const submitButton = document.createElement("button");
      submitButton.id = "submitQuizButton";
      submitButton.classList.add("btn", "btn-primary");
      submitButton.type = "submit";
      submitButton.innerText = "Submit Quiz";
      const submitButtonWrapper = document.createElement("div");
      submitButtonWrapper.style.textAlign = "center";
      submitButtonWrapper.style.marginTop = "20px";
      submitButtonWrapper.appendChild(submitButton);
      form.appendChild(submitButtonWrapper);
  } catch (error) {
    console.error("Failed to load questions:", error);
  }

  form.addEventListener("submit", handleSubmit);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const answers = {};
    if (document.getElementById("quizResult")) {
      document.getElementById("quizResult").remove();
    }
    const resultElement = document.createElement("div");
    resultElement.id = "quizResult";
    resultElement.style.marginTop = "20px";
    resultElement.style.textAlign = "center";

    for (const [key, value] of formData.entries()) {
      answers[key] = value;
    }

    console.log("Collected answers:", JSON.stringify(answers));

    fetch(`/submit_quiz/${topic}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answers),
    })
    .then(response => response.json())
    .then(data => {
      resultElement.innerHTML = `<h3>Your Score: ${data.score} / ${data.total}</h3>
                                 <p>Percentage: ${data.percentage}%</p>`;
      document.querySelector(".card-body").appendChild(resultElement);
    })
    .catch(error => {
      console.error("Error submitting quiz:", error);
    });
  }
});
