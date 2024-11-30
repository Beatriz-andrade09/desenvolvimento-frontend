const form = document.querySelector('form');
const ul = document.getElementById('to-do-activities');

window.addEventListener("DOMContentLoaded", () => {
    const savedList = localStorage.getItem("activitiesHTML");
    if (savedList) {
        ul.innerHTML = savedList;
    }
});

form.addEventListener('submit', function(event) {
    event.preventDefault();
    ul.querySelectorAll('textarea').forEach(textarea => {
        textarea.innerText = textarea.value;
    });

    localStorage.setItem("activitiesHTML", ul.innerHTML);
});

document.getElementById('to-do-activities').addEventListener('click', function(event) {
    if (event.target.classList.contains('fa-trash-can')) {
        removeActivity(event);
    }

    if (event.target.classList.contains('fa-square-check')) {
        finishActivity(event);
    }
});

function addActivity() {
    const newActivity = document.getElementById('new_activity');
    createListFromActivity(newActivity.value);
    newActivity.value = '';
    newActivity.focus();
}

function createElement(element, options) { 
    if (element == undefined || options == undefined) {
        return;
    }

    const newElement = document.createElement(element); 

    for (const key in options) {
        newElement[key] = options[key];
    }
    return newElement;
}

function createListFromActivity(newActivity) {
    if (!newActivity) return;
    
    const totalActivities = document.querySelectorAll('textarea').length;
    const li = createElement('li', {className: 'flex-row'}); 
    const divDescription = createElement('div', {className: 'activity-description'}); 
    const textarea = createElement('textarea', {'value': newActivity, 'id' : totalActivities + 1});
    const divAction = createElement('div', {className: 'activity-action'}); 
    const iconCheck = createElement('i', {className: 'fa-regular fa-square-check'}); 
    const iconTrash = createElement('i', {className: 'fa-regular fa-trash-can'});


    divDescription.appendChild(textarea); 
    
    divAction.appendChild(iconCheck);
    divAction.appendChild(iconTrash);

    li.appendChild(divDescription);
    li.appendChild(divAction);

    ul.appendChild(li);
}

function removeActivity(event) {    
    const elemento = event.target; 
    const li = elemento.closest('li');    
    ul.removeChild(li);
}

function finishActivity(event) {    
    const elemento = event.target; 
    elemento.classList.toggle('fa-regular');
    elemento.classList.toggle('fa-solid');
    elemento.classList.toggle('active');
}

document.getElementById('searchInput').addEventListener('keyup', function(event) { 
    const searchValue = event.target.value; 
    if (!searchValue) {
        document.querySelectorAll('li').forEach(li => li.style.display = 'flex');
        return;
    };
    
    const activities = document.querySelectorAll('textarea');
   
    activities.forEach(activity => {
        const activityValue = activity.value.toLowerCase();
        const li = activity.closest('li');
        li.style.display = 'flex';

        
        if (!activityValue.includes(searchValue.toLowerCase())) {
            li.style.display = 'none';
        }        
    });

})

document.getElementById('filterSituation').addEventListener('change', function(event) { 
    event.preventDefault();
    const situation = event.target.value;
    const activities = document.querySelectorAll('textarea');


    switch (situation) {
        case ('all'): 
            document.querySelectorAll('li').forEach(li => li.style.display = 'flex');
        break;
        case ('done'):
        activities.forEach(activity => {
            const li = activity.closest('li');
            const i = li.querySelector('.fa-square-check');
            console.log(activity.value);
            console.log(i);
            i.classList.contains('fa-solid') ? li.style.display = 'flex' : li.style.display = 'none';
        });
        break;
        case ('todo'):
            activities.forEach(activity => {
                const li = activity.closest('li');
                const i = li.querySelector('.fa-square-check');
                console.log(activity.value);
                console.log(i);
                i.classList.contains('fa-regular') ? li.style.display = 'flex' : li.style.display = 'none';
            });
        default:
        break;
    }
});