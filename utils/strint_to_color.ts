function stringToHslColor(str:string, s:number=50, l:number=50) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    var h = hash % 360;
    return 'hsl('+h+', '+s+'%, '+l+'%)';
  }
  export default stringToHslColor