
(function(){

	
	var arrCells = [];
	var elementsArr = document.getElementsByClassName('cell');
	
	var  initLife = function(size, arrCells){
		for(var i =0; i<size; i++){
			arrCells[i]=[];
			for(var j=0; j<size; j++){
				arrCells[i][j] = Math.floor(Math.random()*2);
			}
		}
	};

	var setView = function(size,arrCells, arrTd){
		for(var i =0; i<arrCells.length; i++){
			for(var j=0; j<arrCells[i].length; j++){
			if(arrCells[i][j]===0){
				//убрать стиль
				arrTd[i*size+j].classList.remove("life");
			}
			else{
				//добавить стиль
				arrTd[i*size+j].classList.add("life");
			}
			}

		}
	}
	var getIndex = function(index,size){
		var rightIndex=index;
		if(index<0){
			rightIndex = index+size;
		}
		else if(index>=size){
			rightIndex=index-size;
		}
		return rightIndex;
	};
	
	var getNeighbours = function(arr, rowSize){
		var neighboursArr = [];
		for(var i=0;i<arr.length; i++){
			neighboursArr[i]=[];
			for(var j=0; j<arr[i].length; j++){
				enviroment=0;
				if(arr[i][getIndex(j-1,rowSize)])
				enviroment++;
				if(arr[i][getIndex(j+1,rowSize)])
				enviroment++;
				if(arr[getIndex(i-1,rowSize)][getIndex(j-1,rowSize)])
				enviroment++;
				if(arr[getIndex(i-1,rowSize)][j])
				enviroment++;
				if(arr[getIndex(i-1,rowSize)][getIndex(j+1,rowSize)])
				enviroment++;
				if(arr[getIndex(i+1,rowSize)][getIndex(j-1,rowSize)])
				enviroment++;
				if(arr[getIndex(i+1,rowSize)][j])
				enviroment++;
				if(arr[getIndex(i+1,rowSize)][getIndex(j+1,rowSize)])
				enviroment++;

				neighboursArr[i][j]=enviroment;

			}
		}
		return neighboursArr;
	};
	
	var nextGeneration = function(arrEnviroment, arrSt){
		var nextGen = [];
		for(var i=0;i<arrEnviroment.length; i++){
		nextGen[i] = [];			
			for(var j=0; j<arrEnviroment[i].length; j++){
				if(arrEnviroment[i][j]<2||arrEnviroment[i][j]>3){
					nextGen[i][j]=0
				}else if(arrEnviroment[i][j]===3){
					nextGen[i][j]=1;
				}else if(arrEnviroment[i][j]===2){
					nextGen[i][j] = arrSt[i][j];
				}
			}
		}
		return nextGen;
	};
	
	initLife(12, arrCells);
	setView(arrCells,elementsArr);
	var fieldSize = 12;

	var makeLife = function(prevState){
		var nextGen=nextGeneration(getNeighbours(prevState,fieldSize),prevState);
		setView(fieldSize,nextGen,elementsArr);
			
			setTimeout(makeLife,800,nextGen);
	};
	makeLife(arrCells);


})()
