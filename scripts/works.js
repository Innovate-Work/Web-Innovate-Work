document.addEventListener('DOMContentLoaded', function() {
    initTabs();
    initPackages();
    updatePackages("Website"); // default tab
});

function initTabs() {
    const tabs = document.querySelectorAll('.tabs div');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(innerTab => {
                innerTab.classList.remove('active-tab');
            });

            tab.classList.add('active-tab');
            updatePackages(tab.textContent.trim()); // Use the tab name to determine which packages to show
        });
    });

    // Set the first tab as active by default
    tabs[0].classList.add('active-tab');
}

function initPackages() {
    const packages = document.querySelectorAll('.work-package');
    packages.forEach((packageElem, index) => {
        setTimeout(() => {
            packageElem.style.transform = "translateY(0)";
            packageElem.style.opacity = "1";
        }, 150 * (index + 1));
    });
}

function updatePackages(tabName) {
    const packages = document.querySelectorAll('.work-package');
    const data = tabData[tabName] || []; // Default to an empty array if no data

    // Hide all packages by default
    packages.forEach(packageElem => {
        packageElem.style.display = "none";
    });

    // Show the appropriate packages based on the tab
    data.forEach((packageData, index) => {
        if (packages[index]) {
            packages[index].style.display = "block";

            const title = packages[index].querySelector('.name-example');
            const link = packages[index].querySelector('.link-example link');

            title.textContent = packageData.title;
            link.textContent = packageData.price; // Assuming price should be in the link for simplicity

            // Here, you'd also populate any other elements in the package based on the data
            // For example, if you have a list of features or other data, you'd populate it here.
        }
    });
}

const tabData = {
    "Website": [
        {
            name: "Web site online shop for Nike",
            link: "www.example1.com"
        },
        {
            name: "Web site online shop for Adidas",
            link: "www.example2.com"
        },
        {
            name: "Web site online shop for Puma",
            link: "www.example3.com"
        }
    ],
    "Application": [
        {
            name: "App for Nike Store",
            link: "www.app-example1.com"
        },
        {
            name: "App for Adidas Store",
            link: "www.app-example2.com"
        },
        {
            name: "App for Puma Store",
            link: "www.app-example3.com"
        }
    ]
};

function updatePackages(tabName) {
    const data = tabData[tabName];
    const workPackages = document.querySelectorAll('.work-package');
    
    workPackages.forEach((packageElem, index) => {
        if (data[index]) {
            const nameElem = packageElem.querySelector('.name-example');
            const linkElem = packageElem.querySelector('.link-example');

            nameElem.textContent = data[index].name;
            linkElem.innerHTML = `<a href="http://${data[index].link}" target="_blank">${data[index].link}</a>`;
        } else {
            // If there's no data for this package, hide it
            packageElem.style.display = "none";
        }
    });
}

