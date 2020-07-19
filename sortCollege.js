const College_homepage = require('./models/college_homepage');
const fests = require('./models/fests');

exports.remaing_days = function(a, b){
        // a should come before b in the sorted order
        if(parseInt(a.remaing_days) < parseInt(b.remaing_days)){
                return -1;
        // a should come after b in the sorted order
        }else if(parseInt(a.remaing_days) > parseInt(b.remaing_days)){
                return 1;
        // a and b are the same
        }else{
                return 0;
        }
}

exports.update_remainingdays = function(currentValue,callfrom,next){
  if(callfrom == 'college'){
    var today = new Date()
    for(i=0;i<currentValue.length;i++){
      if(currentValue[i].date != ""){
        if ((new Date(today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()))<new Date(currentValue[i].date)){
          const diffTime = Math.abs(new Date(today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate())-new Date(currentValue[i].date));
          const diffDays =Math.round((diffTime / (1000 * 60 * 60 * 24)));
          currentValue[i].remaing_days = diffDays;
        } else{
          currentValue[i].remaing_days = -1
        }
      }
      College_homepage.updateOne({_id: currentValue[i]._id},currentValue[i],function(err,result){
        if(err) next(err)
      })
    }
    return currentValue
  }
  else{
    var today = new Date()
    for(i=0;i<currentValue.length;i++){
      if(currentValue[i].date != ""){
        if ((new Date(today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()))<new Date(currentValue[i].date)){
          const diffTime = Math.abs(new Date(today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate())-new Date(currentValue[i].date));
          const diffDays =Math.round((diffTime / (1000 * 60 * 60 * 24)));
          currentValue[i].remaing_days = diffDays;
        } else{
          currentValue[i].remaing_days = -1
        }
      }
      fests.updateOne({_id: currentValue[i]._id},currentValue[i],function(err,result){
        if(err){console.log(err);}
      })
    }
    return currentValue
  }
}
