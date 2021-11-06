export  function isValidImage(url) {
    var image = new Image();
    image.onload = function() {
      if (this.width > 0) {
        console.log("image exists");
        return true
      }
    }
    image.onerror = function() {
      console.log("image doesn't exist");
      return false
    }
    image.src = url;
}