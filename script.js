document.addEventListener('DOMContentLoaded', () => {
    // Bouton de partage
    const shareBtn = document.getElementById('shareBtn');
    const toast = document.getElementById('toast');
    
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            const url = window.location.href;
            
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: document.title,
                        text: 'Découvrez tous mes liens et réseaux sociaux !',
                        url: url
                    });
                } catch (err) {
                    console.log('Partage annulé ou échoué', err);
                }
            } else {
                // Si l'API Web Share n'est pas supportée, copier dans le presse-papiers
                try {
                    await navigator.clipboard.writeText(url);
                    showToast();
                } catch (err) {
                    console.error('Erreur lors de la copie du lien:', err);
                }
            }
        });
    }
    
    // Fonction d'affichage du toast
    function showToast() {
        if (!toast) return;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Effet 3D "tilt" sur les liens (uniquement pour les écrans non-tactiles / PC)
    const cards = document.querySelectorAll('.link-item');
    
    if (window.matchMedia("(pointer: fine)").matches) {
        cards.forEach(card => {
            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseleave', handleMouseLeave);
        });
    }

    function handleMouseMove(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left; // position X dans l'élément
        const y = e.clientY - rect.top;  // position Y dans l'élément
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculer la rotation
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    }

    function handleMouseLeave() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        
        // Laisse une petite transition pour retourner à la normale
        this.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
        setTimeout(() => {
            this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';
        }, 500);
    }
});
