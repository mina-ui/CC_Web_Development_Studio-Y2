let popups = [];

        // Fetch popups from our backend API
        async function fetchPopups() {
            try {
                const response = await fetch('/api/popups');
                popups = await response.json();
            } catch (error) {
                console.error('Error fetching popups:', error);
            }
        }

        // Submit new popup
        async function submitPopup(event) {
            event.preventDefault();
            
            const text = document.getElementById('text').value;
            const image = document.getElementById('image').value;
            const link = document.getElementById('link').value;

            try {
                const response = await fetch('/api/popups', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        text,
                        image: image || null,
                        link: link || null
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to add popup');
                }

                // Show success message
                document.getElementById('successMessage').style.display = 'block';
                document.getElementById('errorMessage').style.display = 'none';
                
                // Clear form
                document.getElementById('popupForm').reset();
                
                // Refresh popups
                await fetchPopups();
                
                // Hide success message after 3 seconds
                setTimeout(() => {
                    document.getElementById('successMessage').style.display = 'none';
                }, 3000);

            } catch (error) {
                console.error('Error adding popup:', error);
                document.getElementById('errorMessage').style.display = 'block';
                document.getElementById('successMessage').style.display = 'none';
            }
        }

        // Previous popup display functions remain the same...
        function showRandomPopup() {
            if (popups.length === 0) return;
            
            const popup = popups[Math.floor(Math.random() * popups.length)];
            document.getElementById('popupText').textContent = popup.text;
            
            const imageContainer = document.getElementById('popupImage');
            imageContainer.innerHTML = popup.image ? 
                `<img src="${popup.image}" alt="Happy moment">` : '';
            
            const linkContainer = document.getElementById('popupLink');
            linkContainer.innerHTML = popup.link ? 
                `<a href="${popup.link}" target="_blank">Learn More</a>` : '';
            
            document.getElementById('popupOverlay').style.display = 'flex';
        }

        function closePopup() {
            document.getElementById('popupOverlay').style.display = 'none';
        }

        // Show random popup every 30 seconds
        setInterval(showRandomPopup, 30000);

        // Initial fetch of popups
        fetchPopups();

        // Close popup when clicking outside
        document.getElementById('popupOverlay').addEventListener('click', function(event) {
            if (event.target === this) {
                closePopup();
            }
        });