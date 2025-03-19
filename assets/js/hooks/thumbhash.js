export default {
    mounted() {
      let { data } = this.el.dataset;
      let thumbHashFromBase64 = base64ToBinary(data.thumbhash)
      let placeholderURL = ThumbHash.thumbHashToDataURL(thumbHashFromBase64)

      this.el.addEventListener("error", (ev) => {
        ev.preventDefault();
        ev.target.src = url(${placeholderURL})
        ev.onerror = null
      });
    }
}