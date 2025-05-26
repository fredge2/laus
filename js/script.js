// Script pour le site Laus Perennis Oelenberg

document.addEventListener('DOMContentLoaded', function() {
    // Gestion du menu mobile
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            
            // Animation des barres du hamburger
            const spans = this.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }
    
    // Animation au défilement
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.pillar-item, .feature-box, .cta-box, .gallery-item, .next-item, .scenario-item, .resource-item, .condition-item, .principle-item, .phase-item, .testimonial-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('visible');
            }
        });
    };
    
    // Exécuter une fois au chargement
    animateOnScroll();
    
    // Puis à chaque défilement
    window.addEventListener('scroll', animateOnScroll);
    
    // Citations aléatoires
    const quotes = [
        {
            text: "La prière continue est comme une respiration de l'Église, qui inspire et expire la louange divine.",
            author: "Saint Jean-Paul II"
        },
        {
            text: "Que ma prière s'élève devant toi comme l'encens, et mes mains, comme l'offrande du soir.",
            author: "Psaume 141:2"
        },
        {
            text: "Priez sans cesse.",
            author: "1 Thessaloniciens 5:17"
        },
        {
            text: "La prière perpétuelle est un pont entre le temps et l'éternité.",
            author: "Saint Augustin"
        },
        {
            text: "Là où est ton trésor, là aussi sera ton cœur.",
            author: "Matthieu 6:21"
        }
    ];
    
    const randomQuoteContainers = document.querySelectorAll('.random-quote');
    
    if (randomQuoteContainers.length > 0) {
        randomQuoteContainers.forEach(container => {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const quote = quotes[randomIndex];
            
            const blockquote = document.createElement('blockquote');
            blockquote.textContent = quote.text;
            
            const cite = document.createElement('cite');
            cite.textContent = `— ${quote.author}`;
            
            container.appendChild(blockquote);
            container.appendChild(cite);
        });
    }
    
    // Compteur de soutiens (simulé)
    const supportCounter = document.querySelector('.support-counter');
    
    if (supportCounter) {
        const startCount = 127; // Nombre initial
        const targetCount = 150; // Objectif
        let currentCount = startCount;
        
        const updateCounter = () => {
            supportCounter.querySelector('.current-count').textContent = currentCount;
            supportCounter.querySelector('.target-count').textContent = targetCount;
            
            const progressBar = supportCounter.querySelector('.progress-bar-fill');
            const progressPercentage = (currentCount / targetCount) * 100;
            progressBar.style.width = `${progressPercentage}%`;
        };
        
        updateCounter();
        
        // Simuler de nouveaux soutiens occasionnellement
        setInterval(() => {
            if (currentCount < targetCount) {
                currentCount++;
                updateCounter();
            }
        }, 30000); // Toutes les 30 secondes
    }
    
    // Galerie d'images avec lightbox simple
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    if (galleryItems.length > 0) {
        // Créer les éléments du lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.style.display = 'none';
        
        const lightboxImg = document.createElement('img');
        const lightboxCaption = document.createElement('p');
        lightboxCaption.className = 'lightbox-caption';
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'lightbox-close';
        closeBtn.innerHTML = '&times;';
        
        lightbox.appendChild(closeBtn);
        lightbox.appendChild(lightboxImg);
        lightbox.appendChild(lightboxCaption);
        document.body.appendChild(lightbox);
        
        // Ajouter les événements
        galleryItems.forEach(img => {
            img.addEventListener('click', function() {
                lightboxImg.src = this.src;
                
                // Récupérer la légende si elle existe
                const caption = this.nextElementSibling;
                if (caption && caption.classList.contains('caption')) {
                    lightboxCaption.textContent = caption.textContent;
                    lightboxCaption.style.display = 'block';
                } else {
                    lightboxCaption.style.display = 'none';
                }
                
                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Empêcher le défilement
            });
        });
        
        // Fermer le lightbox
        closeBtn.addEventListener('click', function() {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto'; // Réactiver le défilement
        });
        
        // Fermer également en cliquant en dehors de l'image
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // FAQ accordéon
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('h4');
            const answer = item.querySelector('p');
            
            // Cacher initialement les réponses sauf la première
            if (item !== faqItems[0]) {
                answer.style.display = 'none';
            }
            
            question.addEventListener('click', function() {
                // Fermer toutes les autres réponses
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.querySelector('p').style.display = 'none';
                        otherItem.classList.remove('active');
                    }
                });
                
                // Basculer l'affichage de la réponse actuelle
                if (answer.style.display === 'none') {
                    answer.style.display = 'block';
                    item.classList.add('active');
                } else {
                    answer.style.display = 'none';
                    item.classList.remove('active');
                }
            });
            
            // Ajouter un style de curseur pour indiquer que c'est cliquable
            question.style.cursor = 'pointer';
        });
    }
});
