const lists = document.querySelectorAll('.collapsable-tag-list');

[...lists].map(list => {
    list.addEventListener('click', function() {
        this.classList.toggle('collapsable-tag-list--uncollapsed');
    });
});