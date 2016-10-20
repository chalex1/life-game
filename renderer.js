// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
(function(){
	
	
	var viewArr = document.getElementsByClassName('cellulate');
	var stateArr = [];
	var rowSize = 12;
	
	var initState = function(arr, size){
		for(var i =0; i<size; i++){
			arr[i] = {};
			arr[i].state = Math.floor(Math.random()*2);
			
		}
	}
	
	var setView = function(sArr, vArr, className){
		
		for(var i =0; i<vArr.length; i++){
			if(sArr[i].state){
				vArr[i].classList.add(className);
			}else{
				vArr[i].classList.remove(className);
			}
		}
	}
	
	var setEnviroment = function(arr,rowSize){
		for(var i=0;i<arr.length; i++){
			var enviroment=0;
			if(arr[i-rowSize-1]&&arr[i-rowSize-1].state){
				enviroment++;
			}
			if(arr[i-rowSize]&&arr[i-rowSize].state){
				enviroment++;
			}
			if(arr[i-rowSize+1]&&arr[i-rowSize+1].state){
				enviroment++;
			}
			if(arr[i-1]&&arr[i-1].state){
				enviroment++;
			}
			if(arr[i+1]&&arr[i+1].state){
				enviroment++;
			}
			if(arr[i+rowSize-1]&&arr[i+rowSize-1].state){
				enviroment++;
			}
			if(arr[i+rowSize]&&arr[i+rowSize].state){
				enviroment++;
			}
			if(arr[i+rowSize+1]&&arr[i+rowSize+1].state){
				enviroment++;
			}
			arr[i].enviroment = enviroment;
		}
	}
	var setNextGeneration = function(arr){
		for(var i=0;i<arr.length; i++){
			var nextState =0;
			if(arr[i].state){
				nextState=1;
				if(arr[i].enviroment<2)
					nextState=0;
				else if(arr[i].enviroment>3)
					nextState=0;
			}else{
				if(arr[i].enviroment===3)
					nextState=1;		
			}
			arr[i].state = nextState;

		}
	}
	
	var setStatistic = function(statisticStr){
		document.getElementsByClassName('statistic')[0].innerHTML = statisticStr;
	}
	
	var life = function(sizeOfGeneration, func){
		for(var i=0;i<sizeOfGeneration; i++){
			setTimeout( func,700*i, i);
		}
	}
	
	var generationCicle = function(generationNumber){			
		setView(stateArr, viewArr, 'life');
		setStatistic('Generation:'+ generationNumber);		
		setEnviroment(stateArr,rowSize);
		setNextGeneration(stateArr);
	}
	
	initState(stateArr, rowSize*rowSize);
	life(100, generationCicle);
	
})()