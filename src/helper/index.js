function convert_timestamp(time){
    let present_time = new Date().getTime()
    let timestamp = new Date(time)
    let re = /^([0-9]+:[0-9]+)/
  
    if(present_time < time) { 
      alertify.error(error_undefine_mess)
      return
    }
  
    if(new Date().toLocaleDateString() == timestamp.toLocaleDateString()){
      ts = present_time - time;
  
      //   second
      ts = ts / 1000
      if(ts < 60){
        // example 09:14 => 9:14
        let string_to_return = timestamp.toTimeString().match(re)[0]
        if(string_to_return[0] == '0') string_to_return = string_to_return.substr(1)
        return string_to_return
      }
  
      //   minute
      ts = ts / 60
      if(ts < 60){
        let string_to_return = timestamp.toTimeString().match(re)[0]
        if(string_to_return[0] == '0') string_to_return = string_to_return.substr(1)
        return string_to_return
      }
  
      // hour
      ts = ts / 60
      if(ts < 24){
        let string_to_return = timestamp.toTimeString().match(re)[0]
        if(string_to_return[0] == '0') string_to_return = string_to_return.substr(1)
        return string_to_return
      }
    }
  
  
    // day
    else {
      let timeline = timestamp.toLocaleDateString()
      timeline = timeline.split('/')
  
      // example 14:14:47 GMT+0700 (Indochina Time) => 14:14 = 14p 14s
      let hour = timestamp.toTimeString().match(re)[0]
      
      return `${hour} ${timeline[1]} Tháng ${timeline[0]}, ${timeline[2]}`
    }
}

function convert_product_type_to_vi(type_product){
    switch(type_product) {
        case "phone":
            return "Điện thoại";
        case "electronic":
            return "Đồ điện tử"
        case "car":
            return "Ô tô"
        case "bike":
            return "Xe cộ"
        case "furniture":
            return "Đồ nội thất"
        case "pet":
            return "Vật nuôi"
        case "book":
            return "Sách, văn phòng phẩm"
        case "fashion":
            return "Thời trang"
        case "kid":
            return "Trẻ em"
        case "services":
            return "Dịch vụ"
        case "job":
            return "Việc làm"
        case "real_estate":
            return "Bất động sản"
      }
}

module.exports = {
    convert_timestamp,
    convert_product_type_to_vi
}