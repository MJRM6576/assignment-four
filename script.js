let interviewList = [];
let rejectedList = [];
let currentStatus = "all"

let total = document.getElementById('total');
let interviewCount = document.getElementById('interview');
let rejectedCount = document.getElementById('rejected');
let totalJobs = document.getElementById('total-jobs');

// Button 
const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');
 

const allCardSection = document.getElementById('allCards');
const mainContainer = document.querySelector('main')
const filterSection = document.getElementById('filter-section')



function countCalcule(){
    total.innerText = allCardSection.children.length;
    totalJobs.innerText = allCardSection.children.length;

    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
}
countCalcule()

function filterBtnStyle(id){
    currentStatus = id
    // Remove bg Color 
    allFilterBtn.classList.remove('bg-blue-500', 'text-white')
    interviewFilterBtn.classList.remove('bg-blue-500', 'text-white')
    rejectedFilterBtn.classList.remove('bg-blue-500', 'text-white')
    // Add bg Color 
    allFilterBtn.classList.add('bg-white', 'text-black')
    interviewFilterBtn.classList.add('bg-white', 'text-black')
    rejectedFilterBtn.classList.add('bg-white', 'text-black')

    const selectd = document.getElementById(id)
    selectd.classList.remove('bg-white', 'text-black')
    selectd.classList.add('bg-blue-500', 'text-white')

    if(id == 'interview-filter-btn'){
        allCardSection.classList.add('hidden')
        filterSection.classList.remove('hidden')
        renderInterview()
    }else if(id == 'all-filter-btn'){
        allCardSection.classList.remove('hidden')
       filterSection.classList.add('hidden')
    }else if(id == 'rejected-filter-btn'){
        allCardSection.classList.add('hidden')
       filterSection.classList.remove('hidden')
       renderrejected()
    }


}



mainContainer.addEventListener('click', function(event){
    
    if(event.target.classList.contains('inter-btn')){
        const parenNode = event.target.parentNode.parentNode;
        
        const jobPosition = parenNode.querySelector('.jobPosition').innerText;
        const skilBase = parenNode.querySelector('.skilBase').innerText;
        const salary = parenNode.querySelector('.salary').innerText;
        const statu = parenNode.querySelector('.statu').innerText;
        const notes = parenNode.querySelector('.notes').innerText;

        parenNode.querySelector('.statu').innerText ="Interview"
    
        const cardInfo = {
        jobPosition,
        skilBase,
        salary,
        statu:"Interview",
        notes
        }

        const jobexist = interviewList.find(item=> item.jobPosition == cardInfo.jobPosition)
        if(!jobexist){
             interviewList.push(cardInfo)
        }
        rejectedList = rejectedList.filter(item=> item.jobPosition !=cardInfo.jobPosition)
        

        countCalcule()
        renderInterview()
     }else if(event.target.classList.contains('reject-btn')){
        const parenNode = event.target.parentNode.parentNode;
        console.log(event.target.parentNode.parentNode)
        const jobPosition = parenNode.querySelector('.jobPosition').innerText;
        const skilBase = parenNode.querySelector('.skilBase').innerText;
        const salary = parenNode.querySelector('.salary').innerText;
        const statu = parenNode.querySelector('.statu').innerText;
        const notes = parenNode.querySelector('.notes').innerText;

        parenNode.querySelector('.statu').innerText ="Rejected"
    
        const cardInfo = {
        jobPosition,
         skilBase,
        salary,
        statu:"Rejected",
         notes
        }

        const jobexist = rejectedList.find(item=> item.jobPosition == cardInfo.jobPosition)
        if(!jobexist){
            rejectedList.push(cardInfo)
        }
        interviewList = interviewList.filter(item=> item.jobPosition !=cardInfo.jobPosition)
        if(currentStatus == 'interview-filter-btn'){
            renderInterview()
        }else if(currentStatus == 'rejected-filter-btn'){
            renderrejected()
        }

        countCalcule()
    }else if(event.target.closest('.delete-btn')) {
    const parenNode = event.target.closest('.flex');
    const jobPosition = parenNode.querySelector('.jobPosition').innerText;
    
    
    interviewList = interviewList.filter(item => item.jobPosition !== jobPosition);
    rejectedList = rejectedList.filter(item => item.jobPosition !== jobPosition);
    
    parenNode.remove();
    countCalcule();
}   
     
})

// Creat Element  function
function renderInterview(){
    filterSection.innerHTML =""

    for(let interview of interviewList){
        let div = document.createElement('div');
        div.className = 'flex justify-between border p-8'
        div.innerHTML =`
              <div class="space-y-4">
                    <div>
                        <p class="jobPosition text-3xl font-semibold">${interview.jobPosition}</p>
                        <p class="skilBase text-gray-400">React Native Developer</p>
                    </div>
                    <p class="salary">Remote Full-time $130,000 - $175,000</p>
                    <p class="statu"> ${interview.statu} </p>
                    <p class="notes">Build cross-platform mobile applications users worldwide.</p>
                    <div>
                        <button class="btn inter-btn text-green-500">interview</button>
                        <button class="btn reject-btn text-red-500">Rejected</button>
                    </div>

                </div>
                <!-- Right side-->
                 <div>
                    <button class="btn text-red-500 bg-red-200"><i class="fa-solid fa-trash-can"></i></button>
                 </div>
        
        `
        filterSection.append(div)
    }
}
function renderrejected(){
    filterSection.innerHTML =""

    for(let rejected of rejectedList){
        let div = document.createElement('div');
        div.className = 'flex justify-between border p-8'
        div.innerHTML =`
              <div class="space-y-4">
                    <div>
                        <p class="jobPosition text-3xl font-semibold">${rejected.jobPosition}</p>
                        <p class="skilBase text-gray-400">React Native Developer</p>
                    </div>
                    <p class="salary">Remote Full-time $130,000 - $175,000</p>
                    <p class="statu"> ${rejected.statu} </p>
                    <p class="notes">Build cross-platform mobile applications users worldwide.</p>
                    <div>
                        <button class="btn inter-btn text-green-500">interview</button>
                        <button class="btn reject-btn text-red-500">Rejected</button>
                    </div>

                </div>
                <!-- Right side-->
                 <div>
                    <button class="btn text-red-500 bg-red-200"><i class="fa-solid fa-trash-can"></i></button>
                 </div>
        
        `
        filterSection.append(div)
    }
}
