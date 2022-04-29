let ques = document.querySelector('.question');
let q_input_js = document.querySelector('.question0_input');
let opt = document.querySelector('.options');
for(let x = 0; x < 9; x++) {
    let ques_clone = ques.cloneNode(true);
    let q_input_js_clone = q_input_js.cloneNode(true);
    let opt_clone = opt.cloneNode(true);
    document.body.appendChild(ques_clone);
    document.body.appendChild(q_input_js_clone);
    document.body.appendChild(opt_clone);
}