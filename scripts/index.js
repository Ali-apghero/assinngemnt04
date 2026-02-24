let interviewList = [];
let rejectList = [];

const totalDisplay = document.querySelector('#navbar div'); // Header e jekhane "8 Jobs" lekha
const interviewCount = document.getElementById('interview');
const rejectedCount = document.getElementById('rejected');
const availableCount = document.getElementById('available');

const allBtn = document.getElementById('all-btn');
const interviewBtn = document.getElementById('interview-btn');
const rejectedBtn = document.getElementById('rejected-btn');
const mainContainer = document.querySelector('main');

// 1. Counter and Header Update Function
function calculateCount() {
    const allCards = document.querySelectorAll('.card-container');
    const msgDiv = document.getElementById('no-jobs-msg');
    const total = allCards.length;
    
    // Dashboard values update
    availableCount.innerText = total;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectList.length;

    // Header logic update (jemon: 1 of 8 Jobs)
    updateHeaderDisplay(total);

    // No Jobs Available Message Logic
    if (total === 0) {
        msgDiv.classList.remove('hidden'); // Message show korbe
    } else {
        msgDiv.classList.add('hidden'); // Message hide hobe
    }
}

function updateHeaderDisplay(total) {
    if (allBtn.classList.contains('bg-blue-500')) {
        totalDisplay.innerText = `${total} Jobs`;
    } else if (interviewBtn.classList.contains('bg-blue-500')) {
        totalDisplay.innerText = `${interviewList.length} of ${total} Jobs`;
    } else if (rejectedBtn.classList.contains('bg-blue-500')) {
        totalDisplay.innerText = `${rejectList.length} of ${total} Jobs`;
    }
}

// 2. Tab Toggle and Filtering
function toggleStyle(id) {
    [allBtn, interviewBtn, rejectedBtn].forEach(btn => {
        btn.classList.remove('bg-blue-500', 'text-white');
        btn.classList.add('text-gray-500');
    });

    const selected = document.getElementById(id);
    selected.classList.add('bg-blue-500', 'text-white');

    const allCards = document.querySelectorAll('.card-container');
    allCards.forEach(card => {
        const status = card.querySelector('#not-applied-btn').innerText;
        if (id === 'all-btn') {
            card.style.display = 'flex';
        } else if (id === 'interview-btn') {
            card.style.display = (status === 'INTERVIEW') ? 'flex' : 'none';
        } else if (id === 'rejected-btn') {
            card.style.display = (status === 'REJECTED') ? 'flex' : 'none';
        }
    });
    
    // Tab change hole header update hobe
    const total = document.querySelectorAll('.card-container').length;
    updateHeaderDisplay(total);
}

// 3. Main Click Handler
mainContainer.addEventListener('click', function(event) {
    const target = event.target;
    const card = target.closest('.card-container');
    if (!card) return;

    const statusBtn = card.querySelector('#not-applied-btn');
    const companyName = card.querySelector('.company-name').innerText;

    if (target.innerText === 'INTERVIEW') {
        if (!interviewList.includes(companyName)) {
            interviewList.push(companyName);
            rejectList = rejectList.filter(name => name !== companyName);
            statusBtn.innerText = "INTERVIEW";
            statusBtn.className = "btn my-5 font-[14px] text-green-600 bg-green-50";
        }
    }

    if (target.innerText === 'REJECTED') {
        if (!rejectList.includes(companyName)) {
            rejectList.push(companyName);
            interviewList = interviewList.filter(name => name !== companyName);
            statusBtn.innerText = "REJECTED";
            statusBtn.className = "btn my-5 font-[14px] text-red-600 bg-red-50";
        }
    }

    if (target.closest('.delete-btn')) {
        card.remove();
        interviewList = interviewList.filter(name => name !== companyName);
        rejectList = rejectList.filter(name => name !== companyName);
    }

    calculateCount();
});

// Initial Load
calculateCount();