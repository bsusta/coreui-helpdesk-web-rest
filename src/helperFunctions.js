import moment from "moment";

export const timestampToString = (timestamp) => {
  let date = (new Date(timestamp*1000));
  return date.getHours()+":"+(date.getMinutes()<10?'0':'')+date.getMinutes()+" "+date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear();
}

export const isEmail = (email) => {
  return (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email);
}

export const isIP = (ip) => {
  return (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip));
}

export const areObjectsSame = (object1, object2) => {
  for (let key in object1){
    if(object1[key]!==object2[key]){
      return false;
    };
  }
  return true;
}

export const processCustomAttributes = (savedAttributes,originalAttributes) => {
  for (let key in savedAttributes) {
    let attribute = originalAttributes[originalAttributes.findIndex(item => item.id == key)]; //from ID find out everything about the field
    switch (attribute.type) {
      case "multi_select": {
        let newMulti = [];
        savedAttributes[key].map(item =>
          newMulti.push(attribute.options[parseInt(item)])
        );
        savedAttributes[key] = newMulti;
        break;
      }
      case "date":{ //date should be formatted into miliseconds since 1970, divided by 1000 because of PHP/Javascript difference
        savedAttributes[key] = savedAttributes[key] === null ?  "null":Math.ceil(savedAttributes[key].valueOf() / 1000);
          break;
        }
      case "checkbox":{
        savedAttributes[key] = savedAttributes[key]?"true":"false";
        break;
      }
      case "input":
        if (savedAttributes[key] === "") {
          savedAttributes[key] = "null";
        }
        break;
      case "text_area":
        if (savedAttributes[key] === "") {
          savedAttributes[key] = "null";
        }
        break;
        break;
      case "decimal_number":
        if (isNaN(parseFloat(savedAttributes[key]))) {
          savedAttributes[key] = "null";
        }
        break;
      case "integer_number":
        if (isNaN(parseFloat(savedAttributes[key]))) {
          savedAttributes[key] = "null";
        }
        break;
      default:
        break;
    }
  }
  return savedAttributes;
}

export const initialiseCustomAttributes=(attributes)=>{
  let data = {};
  attributes.map(attribute => {
    let value = "";
    switch (attribute.type) {
      case "input":
        value = "";
        break;
      case "text_area":
        value = "";
        break;
      case "simple_select":
        value = attribute.options[0];
        break;
      case "multi_select":
        value = [];
        break;
      case "date":
        value = null;
        break;
      case "decimal_number":
        value = "";
        break;
      case "integer_number":
        value = "";
        break;
      case "checkbox":{
        value = false;
        break;
      }
      default:{
        value = "null";
      }
    }
    data[attribute.id] = value;
  });
  return data;
}

export const importExistingCustomAttributesForTask=(currentAttributes,existingCustomAttributes,originalAttributes)=>{
  let keys=Object.keys(currentAttributes);
  let newAttributes= {...currentAttributes};
  existingCustomAttributes.map(attribute => {
    if (keys.includes(attribute.taskAttribute.id.toString())) {
      let original = originalAttributes[
        originalAttributes.findIndex(
          item => item.id == attribute.taskAttribute.id
        )
      ];
      if(original.type==="date"){
        let date = new Date(attribute.value * 1000);
        if (isNaN(date)||attribute.value===null) {
          newAttributes[attribute.taskAttribute.id] = null;
        } else {
          newAttributes[attribute.taskAttribute.id] = moment(attribute.dateValue * 1000);
        }
      }
      else if(original.type==="checkbox"){
        newAttributes[attribute.taskAttribute.id] = attribute.value;
      }else{
        if (original.type === "multi_select") {
          if (attribute.value === null) {
            newAttributes[attribute.taskAttribute.id] = [];
          }
          else{
            let selected = [];
            attribute.value.map(val =>
              selected.push(original.options.indexOf(val))
            );
            newAttributes[attribute.taskAttribute.id] = selected;
          }
        } else {
          newAttributes[attribute.taskAttribute.id] = attribute.value;
        }
      }
    }
  });
  return newAttributes;
}

export const importExistingCustomAttributesForCompany=(currentAttributes,existingCustomAttributes,originalAttributes)=>{
  let keys=Object.keys(currentAttributes);
  let newAttributes= {...currentAttributes};
  existingCustomAttributes.map(attribute => {
    if (keys.includes(attribute.companyAttribute.id.toString())) {
      let original = originalAttributes[
        originalAttributes.findIndex(
          item => item.id == attribute.companyAttribute.id
        )
      ];
      if(original.type==="date"){
        let date = new Date(attribute.dateValue * 1000);
        if (isNaN(date)) {
          newAttributes[attribute.companyAttribute.id] = null;
        } else {
          newAttributes[attribute.companyAttribute.id] = moment(attribute.dateValue * 1000);
        }
      }
      else if(original.type==="checkbox"){
        newAttributes[attribute.companyAttribute.id] = attribute.boolValue;
      }else{
        if (original.type === "multi_select") {
          if (attribute.value === null) {
            newAttributes[attribute.companyAttribute.id] = [];
          }
          else{
            let selected = [];
            attribute.value.map(val =>
              selected.push(original.options.indexOf(val))
            );
            newAttributes[attribute.companyAttribute.id] = selected;
          }
        } else {
          newAttributes[attribute.companyAttribute.id] = attribute.value;
        }
      }
    }
  });
  return newAttributes;
}

export const fillCustomAttributesNulls= (attributes,originalAttributes)=>{
  for (let key in attributes) {
    if(attributes[key]===null){
      switch (originalAttributes[originalAttributes.findIndex(item => item.id == key)].type) {
        case "input":
          attributes[key] = "";
          break;
        case "text_area":
          attributes[key] = "";
          break;
        case "simple_select":
          attributes[key] = originalAttributes[originalAttributes.findIndex(item => item.id == key)].options[0];
          break;
        case "multi_select":
          attributes[key] = [];
          break;
        case "date":
          attributes[key]=moment();
          break;
        case "decimal_number":
          attributes[key] = 0;
          break;
        case "integer_number":
          attributes[key] = 0;
          break;
        case "checkbox":{
          attributes[key] = false;
          break;
        }
        default:{
          value = "null";
        }
      }
    }
  }
  return attributes;
}

export const containsNullRequiredAttribute= (attributes,originalAttributes)=>{
  for (let key in attributes) {
    let original = originalAttributes[originalAttributes.findIndex((item) => (item.id.toString() === key))]; //from ID find out everything about the field
    if(attributes[key]==='null' && original.required){
      return true;
    }
  }
  return false;
}
