import moment from "moment";
import React, { Component } from "react";

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

export const processRESTinput = (input,deleteEmpty)=>{
  if(!input){
    return '';
  }
  let result='';
  Object.keys(input).map((item)=>{
    if(item && input[item] && input[item]!=''&& (!deleteEmpty||input[item]!=='null') ){
      result+=(item+'='+input[item]+'&');
    }
  });
  return result.substring(0,result.length-1);
}

export const processCustomFilterAttributes = (savedAttributes,originalAttributes) => {
  for (let key in savedAttributes) {
    let attribute = originalAttributes[originalAttributes.findIndex(item => item.id == key)]; //from ID find out everything about the field
    switch (attribute.type) {
      case "multi_select": {
        let newMulti = [];
        savedAttributes[key].map(item =>
          newMulti.push(attribute.options[parseInt(item)])
        );
        savedAttributes[key] = JSON.stringify(newMulti);
        break;
      }
      case "simple_select": {
        let values = "";
        savedAttributes[key].map((item)=>values=values+item.label+',');
        savedAttributes[key]=values.substring(0,values.length-1);
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
        let date = new Date(attribute.dateValue * 1000);
        if (isNaN(date)||attribute.dateValue===null) {
          newAttributes[attribute.taskAttribute.id] = null;
        } else {
          newAttributes[attribute.taskAttribute.id] = moment(attribute.dateValue * 1000);
        }
      }
      else if(original.type==="checkbox"){
        newAttributes[attribute.taskAttribute.id] = attribute.boolValue;
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

export const containsNullRequiredAttribute = (attributes,originalAttributes)=>{
  for (let key in attributes) {
    let original = originalAttributes[originalAttributes.findIndex((item) => (item.id.toString() === key))]; //from ID find out everything about the field
    if(attributes[key]==='null' && original.required && original.is_active){
      return true;
    }
  }
  return false;
}

export const filterToFilterState = (filter,taskAttributes,statuses,projects,users,tags,companies)=>{
  let task_data={};
  if(filter.filter.addedParameters){
    let processedParameters=filter.filter.addedParameters.split('&');
    processedParameters.map(item=>{
      let temp=item.split('=');
      if(taskAttributes.find((attribute)=>attribute.id.toString()===temp[0]).type.includes('select')){
        task_data[temp[0]]=temp[1].split(',').map((item)=>{return {label:item,value:item};});
      }
      else if(taskAttributes.find((attribute)=>attribute.id.toString()===temp[0]).type.includes('date')){
        task_data[temp[0]]=moment(parseInt(temp[1])*1000);
      }
      else{
        task_data[temp[0]]=temp[1];
      }
    })

  }
  return {
    createdFrom:filter.filter.createdTime&& parseFilterStringToDate(filter.filter.createdTime).from,
    createdFromNow:filter.filter.createdTime&& parseFilterStringToDate(filter.filter.createdTime).fromNow,
    createdTo:filter.filter.createdTime&& parseFilterStringToDate(filter.filter.createdTime).to,
    createdToNow:filter.filter.createdTime&& parseFilterStringToDate(filter.filter.createdTime).toNow,
    deadlineFrom:filter.filter.deadlineTime&& parseFilterStringToDate(filter.filter.deadlineTime).from,
    deadlineFromNow:filter.filter.deadlineTime&& parseFilterStringToDate(filter.filter.deadlineTime).fromNow,
    deadlineTo:filter.filter.deadlineTime&& parseFilterStringToDate(filter.filter.deadlineTime).to,
    deadlineToNow:filter.filter.deadlineTime&& parseFilterStringToDate(filter.filter.deadlineTime).toNow,
    closedFrom:filter.filter.closedTime&& parseFilterStringToDate(filter.filter.closedTime).from,
    closedFromNow:filter.filter.closedTime&& parseFilterStringToDate(filter.filter.closedTime).fromNow,
    closedTo:filter.filter.closedTime&& parseFilterStringToDate(filter.filter.closedTime).to,
    closedToNow:filter.filter.closedTime&& parseFilterStringToDate(filter.filter.closedTime).toNow,
    title:filter.filter.search?filter.filter.search:'',
    startedFrom:filter.filter.startedTime&& parseFilterStringToDate(filter.filter.startedTime).from,
    startedFromNow:filter.filter.startedTime&& parseFilterStringToDate(filter.filter.startedTime).fromNow,
    startedTo:filter.filter.startedTime&& parseFilterStringToDate(filter.filter.startedTime).to,
    startedToNow:filter.filter.startedTime&& parseFilterStringToDate(filter.filter.startedTime).toNow,
    archived:filter.filter.archived?true:false,
    important:filter.filter.important?true:false,
    statuses:filter.filter.status?statuses.filter((item)=>filter.filter.status.includes(item.id)):[],
    projects:filter.filter.project?projects.filter((item)=>filter.filter.project.includes(item.id)):[],
    creators:filter.filter.creator?users.filter((item)=>filter.filter.creator.includes(item.id)):[],
    requesters:filter.filter.requester?users.filter((item)=>filter.filter.requester.includes(item.id)):[],
    companies:filter.filter.taskCompany?companies.filter((item)=>filter.filter.taskCompany.includes(item.id)):[],
    assignedTos:filter.filter.assigned?users.filter((item)=>filter.filter.assigned.includes(item.id)):[],
    tags:filter.filter.tag?tags.filter((item)=>filter.filter.tag.includes(item.id)):[],
    followers:filter.filter.follower?users.filter((item)=>filter.filter.follower.includes(item.id)):[],
    task_data,
    filterName:filter.title,
    filterPublic:filter.public,
    filterReport:filter.report,
    filterIcon:filter.icon_class,
    filterOrder:filter.order,
  };
}

export const parseFilterStringToDate=(str)=>{
  let result={to:null,from:null,toNow:false,fromNow:false};
  let temp = str.replace('FROM=','').replace('TO=','').split(',');
  if(temp.length===1){
    if(str.includes('FROM=')){
      if(temp[0]==='now'){
        result.fromNow=true;
      }
      else{
        result.from=moment(parseInt(temp[0])*1000);
      }
    }
    else{
      if(temp[0]==='now'){
        result.toNow=true;
      }
      else{
        result.to=moment(parseInt(temp[0])*1000);
      }
    }
  }
  else{
    if(temp[0]==='now'){
      result.fromNow=true;
    }
    else{
      result.from=moment(parseInt(temp[0])*1000);
    }
    if(temp[1]==='now'){
      result.toNow=true;
    }
    else{
      result.to=moment(parseInt(temp[1])*1000);
    }
  }
  return result;
}

export const parseFilterDateToString=(timeFrom,timeTo,fromNow,toNow)=>{
  let from = "";
  let to = "";
  if(timeFrom){
    let from = Math.ceil(timeFrom.valueOf() / 1000);
  }
  if(timeTo){
    let to = Math.ceil(timeTo.valueOf() / 1000);
  }
  if(fromNow){
    from="NOW";
  }
  if(toNow){
    to="NOW";
  }
  if(from===""&& to===""){
    return undefined;
  }
  if(from!==""&&to!==""){
    return "FROM="+from+','+'TO='+to;
  }
  if(from!==""){
    return "FROM="+from;
  }
  if(to!==""){
    return 'TO='+to;
  }
}

export const filterBodyFromState=(state,taskAttributes)=>{
return processRESTinput({
    createdTime:parseFilterDateToString(state.createdFrom,state.createdTo,state.createdFromNow,state.createdToNow),
    startedTime:parseFilterDateToString(state.startedFrom,state.startedTo,state.startedFromNow,state.startedToNow),
    deadlineTime:parseFilterDateToString(state.deadlineFrom,state.deadlineTo,state.deadlineFromNow,state.deadlineToNow),
    closedTime:parseFilterDateToString(state.closedFrom,state.closedTo,state.closedFromNow,state.closedToNow),

    //order:'Title',
    search:state.title,
    status:state.statuses.map((item)=>item.id),
    project:state.projects.map((item)=>item.id),
    creator:state.creators.map((item)=>item.id),
    requester:state.requesters.map((item)=>item.id),
    company:state.companies.map((item)=>item.id),
    assigned:state.assignedTos.map((item)=>item.id),
    tag:state.tags.map((item)=>item.id),
    follower:state.followers.map((item)=>item.id),
    archived:state.archived,
    important:state.important,
    addedParameters:processRESTinput(processCustomFilterAttributes({...state.task_data},[...taskAttributes]),true)
  },true);
}

export const messageBodyToString=(body)=>{
  if(typeof body === "string"){
    return body;
  }
  else if(body.description.from && body.description.to){
    return "Changed from " + body.description.from+ " to "+body.description.to;
  }
  else{
    return "Message not defined";
  }
}

export const hightlightText = (message,text)=>{
  let index = message.toLowerCase().indexOf(text.toLowerCase());
  if (index===-1){
    return (<span>{message}</span>);
  }
  return (<span>{message.substring(0,index)}<span style={{color:'#F0E68C'}}>{message.substring(index,index+text.length)}</span>{message.substring(index+text.length,message.length)}</span>);
}
