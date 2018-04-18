import moment from "moment";

export const timestampToString = (timestamp) => {
  let date = (new Date(timestamp*1000));
  return date.getHours()+":"+(date.getMinutes()<10?'0':'')+date.getMinutes()+" "+date.getDate()+"."+date.getMonth()+"."+date.getFullYear();
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
        savedAttributes[key] = savedAttributes[key] === null ?  "null":savedAttributes[key].valueOf() / 1000;
          break;
        }
      case "checkbox":{
        savedAttributes[key] = savedAttributes[key]?true:false;
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
  existingCustomAttributes.map(attribute => {
    if (currentAttributes.hasOwnProperty(attribute.taskAttribute.id)) {
      ["value", "dateValue", "boolValue"].map(i => {
        if (attribute[i] !== undefined) {
          switch (i) {
            case "dateValue": {
              let date = new Date(attribute.dateValue * 1000);
              if (isNaN(date)) {
                currentAttributes[attribute.taskAttribute.id] = null;
              } else {
                currentAttributes[
                  attribute.taskAttribute.id
                ] = date
                  .toISOString()
                  .substring(0, date.toISOString().length - 1);
              }
              break;
            }
            case "value": {
              let original = originalAttributes[
                originalAttributes.findIndex(
                  item => item.id == attribute.taskAttribute.id
                )
              ];
              if (original.type === "multi_select") {
                if (attribute.value === null) {
                  currentAttributes[attribute.taskAttribute.id] = [];
                  break;
                }
                let selected = [];
                attribute.value.map(val =>
                  selected.push(original.options.indexOf(val))
                );
                currentAttributes[attribute.taskAttribute.id] = selected;
              } else {
                currentAttributes[attribute.taskAttribute.id] = attribute.value;
              }
              break;
            }
            case "boolValue":
              currentAttributes[attribute.taskAttribute.id] = attribute.boolValue;
              break;
            default:
              break;
          }
        }
      });
    }
  })
  return currentAttributes;
}

export const importExistingCustomAttributesForCompany=(currentAttributes,existingCustomAttributes,originalAttributes)=>{
  existingCustomAttributes.map(attribute => {
    if (currentAttributes.hasOwnProperty(attribute.companyAttribute.id)) {
      ["value", "dateValue", "boolValue"].map(i => {
        if (attribute[i] !== undefined) {
          switch (i) {
            case "dateValue": {
              let date = new Date(attribute.dateValue * 1000);
              if (isNaN(date)) {
                currentAttributes[attribute.companyAttribute.id] = null;
              } else {
                currentAttributes[
                  attribute.companyAttribute.id
                ] = date
                  .toISOString()
                  .substring(0, date.toISOString().length - 1);
              }
              break;
            }
            case "value": {
              let original = originalAttributes[
                originalAttributes.findIndex(
                  item => item.id == attribute.companyAttribute.id
                )
              ];
              if (original.type === "multi_select") {
                if (attribute.value === null) {
                  currentAttributes[attribute.companyAttribute.id] = [];
                  break;
                }
                let selected = [];
                attribute.value.map(val =>
                  selected.push(original.options.indexOf(val))
                );
                currentAttributes[attribute.companyAttribute.id] = selected;
              } else {
                currentAttributes[attribute.companyAttribute.id] = attribute.value;
              }
              break;
            }
            case "boolValue":
              currentAttributes[attribute.companyAttribute.id] = attribute.boolValue;
              break;
            default:
              break;
          }
        }
      });
    }
  })
  return currentAttributes;
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
