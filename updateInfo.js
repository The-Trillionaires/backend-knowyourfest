

exports.updateHomepage_value = function(req,res,next){
  updateValue = {}
  if(req.body.description != ""){updateValue.description = req.body.description}
  if(req.body.image_url != ""){updateValue.image_url = req.body.image_url}
  if(req.body.venue != ""){updateValue.venue = req.body.venue}
  if(req.body.date != ""){updateValue.date = req.body.date}
  if(req.body.show != ""){updateValue.show = req.body.show}
  if(typeof(req.body.remaing_days) == typeof(1)){updateValue.remaing_days = req.body.remaing_days}
  return updateValue
}



exports.updatefest_info = function(req,res,next){
  updateValue = {}
  if(req.body.fest_name!= ""){updateValue.fest_name = req.body.fest_name}
  if(req.body.description != ""){updateValue.description = req.body.description}
  if(req.body.website_link != ""){updateValue.website_link = req.website_link}
  if(req.body.image != ""){updateValue.image = req.body.image}
  if(req.body.date != ""){updateValue.date = req.body.date}
  if(typeof(req.body.remaing_days) == typeof(1)){updateValue.remaing_days = req.body.remaing_days}
  return updateValue
}
