console.log('js file working')


const inputElement = document.getElementById("input");
inputElement.addEventListener("change", handleFileChange, false);
function handleFileChange() {
      const fileList = this.files; /* now you can work with the file list */
      // [{
      //       lastModified: 1741899614579
      //       lastModifiedDate: Fri Mar 14 2025 02: 30: 14 GMT + 0530(India Standard Time) {}
      //       name: "snobro.png"
      //       size: 185275
      //       type: "image/png"
      //       webkitRelativePath: ""
      //    }]
      console.log(fileList)

      handleFiles(fileList)
}

function handleFiles(files) {
      const preview = document.getElementById("preview");
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
    
        if (!file.type.startsWith("image/")) {
          continue;
        }
    
        const img = document.createElement("img");
        img.classList.add("preview-img");
        img.file = file;
        preview.appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.
    
        const reader = new FileReader();
        reader.onload = (e) => {
            console.log('mayank i just want to know is this same as the actual image',  e.target.result)
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
    