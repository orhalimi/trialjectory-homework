function toFixed(num, fixed) {
  var re = new RegExp("^-?\\d+(?:.\\d{0," + (fixed || -1) + "})?");
  return Number(num.toString().match(re)[0]);
}

export default { toFixed };
