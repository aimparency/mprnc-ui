export default function resolvePath(object, path) {
  try {
    var subobject = object
    for(var i in path) {
      subobject = subobject[path[i]]
    }
    return subobject
  } 
  catch(err) {
    return undefined
  }
}
	
