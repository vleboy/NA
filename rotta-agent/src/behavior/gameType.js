export const gameType = function (type) {
  let x = ''
  switch (type) {

  	case 'naTable':
  	  x = 10000; 
	  break;  
	  // 'NA棋牌游戏'
	
	case 'naLive':
	  x = 30000; 
	  break;  
	  // 'NA真人视讯'
	
	case 'naMall':
	  x = 3;
	  break
	  // 'NA商城'

	case 'naVedio':
	  x = 40000; 
	  break;  
	  // 'NA电子游戏'
	
	case 'naArcade':
	  x = 50000; 
	  break;  
	  // 'NA街机游戏'
	
	case 'ttgVedio':
	  x = 1010000; 
	  break;  
	  // 'TTG电子游戏'
	
	case 'ptVedio':
	  x = 1020000; 
	  break;  
	  // 'PT电子游戏'
	
	case 'mgVedio':
	  x = 10300000; 
	  break;  
	  // 'MG电子游戏'
	
	case 'hbVedio':
	  x = 1040000; 
	  break;  
	  // 'HB电子游戏'
	
	case 'agLive':
	  x = 1050000; 
	  break;  
	  // 'AG真人'
	
	case 'saLive':
	  x = 1060000; 
	  break;  
	  // 'SA真人'
	
	case 'abLive':
	  x = 1070000;
	  break;  
	  // 'Allbet真人'
	
	case 'sbLive':
	  x = 1080000; 
	  break;  
	  // '申博真人'
	
	case 'imVedio':
	  x = 1090000; 
	  break;  
	  // 'IM电子竞技'
  }
  return x
}