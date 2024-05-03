// Get references to the form and table elements
const jobForm = document.getElementById('jobForm');
const jobTable = document.getElementById('jobTable').getElementsByTagName('tbody')[0];

// Initialize an empty array to store job applications
let jobApplications = [];

// Add event listener to the form for submission
jobForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from submitting and reloading the page

  // Get form values
  const jobTitle = document.getElementById('jobTitle').value;
  const companyName = document.getElementById('companyName').value;
  const applicationDate = document.getElementById('applicationDate').value;
  const applicationStatus = document.getElementById('applicationStatus').value;

  // Create a new job application object
  const jobApplication = {
    jobTitle,
    companyName,
    applicationDate,
    applicationStatus
  };

  // Add the new job application to the array
  jobApplications.push(jobApplication);

  // Clear form inputs
  jobForm.reset();

  // Re-render the table
  renderTable();
});

// Function to render the table with job applications
function renderTable() {
  // Clear existing table rows
  jobTable.innerHTML = '';

  // Loop through job applications and create table rows
  jobApplications.forEach(function(application, index) {
    const row = document.createElement('tr');

    const jobTitleCell = document.createElement('td');
    jobTitleCell.textContent = application.jobTitle;
    row.appendChild(jobTitleCell);

    const companyNameCell = document.createElement('td');
    companyNameCell.textContent = application.companyName;
    row.appendChild(companyNameCell);

    const applicationDateCell = document.createElement('td');
    applicationDateCell.textContent = application.applicationDate;
    row.appendChild(applicationDateCell);

    const applicationStatusCell = document.createElement('td');
    applicationStatusCell.textContent = application.applicationStatus;
    row.appendChild(applicationStatusCell);

    const actionsCell = document.createElement('td');
    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update Status';
    updateButton.addEventListener('click', function() {
      updateApplicationStatus(index);
    });
    actionsCell.appendChild(updateButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
      deleteApplication(index);
    });
    actionsCell.appendChild(deleteButton);

    row.appendChild(actionsCell);

    jobTable.appendChild(row);
  });
}

// Function to update the status of a job application
function updateApplicationStatus(index) {
  const newStatus = prompt('Enter the new status:');
  if (newStatus) {
    jobApplications[index].applicationStatus = newStatus;
    renderTable();
  }
}

// Function to delete a job application
function deleteApplication(index) {
  if (confirm('Are you sure you want to delete this application?')) {
    jobApplications.splice(index, 1);
    renderTable();
  }
}