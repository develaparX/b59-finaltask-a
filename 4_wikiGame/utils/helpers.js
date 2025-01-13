function registerHelpers(hbs) {
  hbs.registerHelper("eq", (a, b) => a === b);
  hbs.registerHelper("sweetAlert", function (type, title, message) {
    return new hbs.SafeString(`
      <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
      <script>
        Swal.fire({
          icon: '${type}', // success, error, warning, info, question
          title: '${title}',
          text: '${message}',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
        });
      </script>
    `);
  });
  hbs.registerHelper("renderQuill", (formName, name, value = "") => {
    return new hbs.SafeString(`
    <div id="editor-container"></div>
    <textarea name="${name}" id="${name}" style="display: none;">${value}</textarea>
    <script>
      var quill = new Quill('#editor-container', {
        theme: 'snow',
        placeholder: 'Write your project description here...',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image']
          ]
        }
      });

      // Jika ada nilai (deskripsi) yang sudah diset, masukkan ke editor Quill
      quill.root.innerHTML = \`${value}\`;

      // Ambil data Quill sebelum submit form
      document.getElementById('${formName}').onsubmit = function () {
        var ${name} = document.getElementById('${name}');
        ${name}.value = quill.root.innerHTML;
      };
    </script>
  `);
  });
  hbs.registerHelper("safeHTML", (text) => {
    return new hbs.SafeString(text);
  });
}

module.exports = { registerHelpers };
