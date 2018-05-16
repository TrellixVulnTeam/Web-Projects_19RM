var candidate = {
    name: 'Hamza Iqbal Mallick',
    qualification: { uni:'University of Karachi\nUBIT-BSCS 2nd Year', college: 'D.J. Sindh Govt. Science College', school: 'Froebel Grammar Academy'},
    acadRec: {uni: 'CGPA: 3.04', college: 'HSC: 79.01%', school: 'SSC: 85.06%'},
    objective: 'I am an enthusiastic, self-motivated, reliable, responsible and hard working person. I am a mature team worker and adaptable to all challenging situations. I am able to work well both in a team environment as well as using own initiative. I am able to work well under pressure and adhere to strict deadlines.',
    skills: 'front-end java, android & web developer!',
    workExperience: ['Developed a Static Website for Online Cloth Market based on basic HTML and CSS with the help of bootstrap.','Four Years of home tuition experience, have full command over intermediate and matric physics.'],
    acadProj: [ 'Developed a Virtual Shopping System based on JAVA (Object Oriented Programming) particularly to reduce the hectic travel issues and save time while shopping online.',  'Developed a Quiz Game with the help of C-language.', 'Developed an Employee Management System using Assmebly Language.', 'Developed Quiz App using JavaScipt.', 'Developed ToDo Application using JavaScript.'],
    interests: ['Android App Development', 'iOS App Development' ],
    emailID: 'hiqbalmallick@gmail.com',
    contact: '332-370-3153',
    socialIDs: {fb: 'facebook.com/hamzaiqbalmallick', twitter: 'twitter.com/hiqbalmallick', in: 'linkedin.com/in/hiqbalmallick'},
}
document.getElementById('uni').innerHTML = candidate.qualification.uni;
document.getElementById('uniRec').innerHTML = candidate.acadRec.uni;
document.getElementById('college').innerHTML = candidate.qualification.college;
document.getElementById('collegeRec').innerHTML = candidate.acadRec.college;
document.getElementById('school').innerHTML = candidate.qualification.school;
document.getElementById('schoolRec').innerHTML = candidate.acadRec.school;
document.getElementById("myIntro").innerHTML = 'Hey there! This is '+ candidate.name + ', a ' + candidate.skills;
document.getElementById('resume').innerHTML = candidate.objective;
// document.getElementById('twitID').onclick(function(){
//     location = 'www.google.com';
// })
var list = document.getElementById('projList');
var epx = document.getElementById('exp');
var inter = document.getElementById('interests');
candidate.workExperience.map((currElement)=>{
    var newTag = document.createElement("li");
        newTag.setAttribute("class","list-group-item");
        var tagText = document.createTextNode(currElement);
        newTag.appendChild(tagText);
        exp.appendChild(newTag);
});
candidate.acadProj.map((currElement)=>{
        var newTag = document.createElement("li");
        newTag.setAttribute("class","list-group-item");
        var tagText = document.createTextNode(currElement);
        newTag.appendChild(tagText);
        list.appendChild(newTag);
    });
candidate.interests.map((currElement)=>{
    var newTag = document.createElement("li");
        newTag.setAttribute("class","list-group-item");
        var tagText = document.createTextNode(currElement);
        newTag.appendChild(tagText);
        inter.appendChild(newTag);
});
document.getElementById('mail').innerHTML = candidate.emailID;
document.getElementById('contNum').innerHTML = candidate.contact;