const numberFormat = (number)=>{
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number).slice(3).split(',')[0];
  }


module.exports = numberFormat