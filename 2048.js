

var board=new Array();
var score=0;


$(document).ready(function(){

	newgame();

});


//新游戏
function newgame(){

	//初始化棋盘格
	init();
	//随机在两个格子生成数字；
	generateOneNumber();
	generateOneNumber();



}
//坐标定位信息
function getPosTop(i,j){
	return 20+i*120;
}

function getPosLeft(i,j){
	return 20+j*120;
}



function init(){
			
	for(var i=0;i<4;i++){
		for (var j= 0; j < 4;j++) {

			
			var gridCell=$("#grid-cell-"+i+"-"+j);
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));


		}
	}

	for (var m = 0; m < 4; m++) {
		board[m]=new Array();
		for (var n = 0; n < 4; n++) {
			board[m][n]=0;
		}
	}

	updateBoardView();
	score=0;
}

//更新board数组，就是更新 整个表格的数字

function updateBoardView(){

	$(".number-cell").remove();


		for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {

			$('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var theNumberCell=$("#number-cell-"+i+"-"+j);
			
			if(board[i][j]==0){
				theNumberCell.css('width','0px');
				theNumberCell.css('height','0px');

				theNumberCell.css('top',getPosTop(i,j)+50);
				theNumberCell.css('left',getPosLeft(i,j)+50);

			}else{
				theNumberCell.css('width','100px');
				theNumberCell.css('height','100px');

				theNumberCell.css('top',getPosTop(i,j));
				theNumberCell.css('left',getPosLeft(i,j));
				theNumberCell.text(board[i][j]);
				


			}

		}
	}
}


//随机生成一个数字
function generateOneNumber(){
	if(nospace(board))
		return false;
	
	//随机一个位置
	var randx=parseInt(Math.floor(Math.random()*4));
	var randy=parseInt(Math.floor(Math.random()*4));
	
	while(true){
		if(board[randx][randy]==0){
			break;
		}
		randx=parseInt(Math.floor(Math.random()*4));
		randy=parseInt(Math.floor(Math.random()*4));
	}

	//随机一个数字

	var randNum=Math.random()<0.5?2:4;
	board[randx][randy]=randNum;

	showNumber(randx,randy,randNum);

	return true;
}

//更新数字
function showNumber(i,j,randNum){
	var numberCell=$('#number-cell-'+i+"-"+j);
	numberCell.text(randNum);
	//这是利用jquery的特效
	numberCell.animate({
		width:"100px",
		height:"100px",
		top:getPosTop(i,j),
		left:getPosLeft(i,j)
	},50);
}


$(document).keydown(function(event){
	switch(event.keyCode){
		case 37://left
			if(moveLeft()){

				generateOneNumber();
				isgameover();
			}
			break;
		case 38://up
			if(moveUp()){
				generateOneNumber();
				isgameover();
			}
			break;	
		case 39://right
			if(moveright()){
				generateOneNumber();
				isgameover();
			}
			break;
		case 40://down
			if(moveDown()){
				generateOneNumber();
				isgameover();
			}
			break;
		default:
			break;
	}
});



/*进行判断能否moveLeft 
*/
function canMoveLeft(){
	//左边是否没有数字?
	//左边数字是否和自己相等?


	for(var i=0;i<4;i++)
		for(var j=1;j<4;j++)
			if(board[i][j]!=0)
				if(board[i][j-1]==0||board[i][j-1]==board[i][j]) return true;
		
		return false;

	
}


/*向左移动
对于每一个数字的左侧位置进行判断，看是否可能为落脚点：
				1.落脚位置是否为空	
				2.落脚位置数字和待判定元素数字相当
				3.移动路径中是否有障碍物

*/
function moveLeft(){


	//先进行判断能否moveLeft
	if(!canMoveLeft()){
		return false;
	}

		for(var i=0;i<4;i++)
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
				for (var k = 0; k < j; k++) {
					if(board[i][k]==0&&noBlockHoriznotal(i,k,j,board)){
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[i][k]==board[i][j]&&noBlockHoriznotal(i,k,j,board)){
						//move and add;
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j]*2;
						board[i][j]=0;
						//add score
						score+=board[i][k];
						updateScore(score);
						continue;

					}
				};
			}
		}

	//一些延迟的东西
	setTimeout("updateBoardView()",200);
	return true;
}



/*进行判断能否moveRight
*/
function canMoveRight(){
	//右边是否没有数字?
	//右边数字是否和自己相等?


	for(var i=0;i<4;i++)
		for(var j=2;j>-1;j--)
			if(board[i][j]!=0)
				if(board[i][j+1]==0||board[i][j+1]==board[i][j]) return true;
		

			return false;
	
}



/*向右移动
对于每一个数字的右侧位置进行判断，看是否可能为落脚点：
				1.落脚位置是否为空	
				2.落脚位置数字和待判定元素数字相当
				3.移动路径中是否有障碍物

*/
function moveright(){



	//先进行判断能否moveRight
	if(!canMoveRight()){
		return false;
	}

		for(var i=0;i<4;i++)
		for(var j=2;j>-1;j--){
			if(board[i][j]!=0){
				for (var k = j+1; k < 4; k++) {
					if(board[i][k]==0&&noBlockHoriznotal(i,k,j,board)){
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[i][k]==board[i][j]&&noBlockHoriznotal(i,k,j,board)){
						//move and add;
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j]*2;
						board[i][j]=0;
						score+=board[i][k];
						updateScore(score);
						continue;
					}
				};
			}
		}

	//一些延迟的东西
	setTimeout("updateBoardView()",200);
	return true;
}








//判断数字是否全满
function nospace(board){

	for (var m = 0; m < 4; m++) {

		for (var n = 0; n < 4; n++) {
			if(board[m][n]==0)
				return false;
			
		}
	}

	return true;
}

function canMoveUp(){
	for(var i=1;i<4;i++)
		for(var j=0;j<4;j++)
			if(board[i][j]!=0)
				if(board[i-1][j]==0||board[i-1][j]==board[i][j]) return true;
		
		return false;
}

function moveUp(){
	if(!canMoveUp()){
		return false;
	}

	for(var i=1;i<4;i++)
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				for (var k = 0; k < i; k++) {
					if(board[k][j]==0&&noBlockVertical(j,k,i,board)){
						//move
						showMoveAnimation(i,j,i,k);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[k][j]==board[i][j]&&noBlockVertical(j,k,i,board)){
						//move and add;
						showMoveAnimation(i,j,i,k);
						board[k][j]=board[i][j]*2;
						board[i][j]=0;
						score+=board[k][j];
						updateScore(score);
						continue;
					}
				};
			}
		}

	//一些延迟的东西
	setTimeout("updateBoardView()",200);




	return true;
}



function canMoveDown(){
	for(var i=2;i>-1;i--)
		for(var j=0;j<4;j++)
			if(board[i][j]!=0)
				if(board[i+1][j]==0||board[i+1][j]==board[i][j]) return true;
		
		return false;

}

function moveDown(){
	if(!canMoveDown()){
		return false;
	}

		for(var i=2;i>-1;i--)
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				for (var k = i+1; k < 4; k++) {
					if(board[k][j]==0&&noBlockVertical(j,k,i,board)){
						//move
						showMoveAnimation(i,j,i,k);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[k][j]==board[i][j]&&noBlockVertical(j,k,i,board)){
						//move and add;
						showMoveAnimation(i,j,i,k);
						board[k][j]=board[i][j]*2;
						board[i][j]=0;
						score+=board[k][j];
						updateScore(score);
						continue;						
					}
				};
			}
		}

	//一些延迟的东西
	setTimeout("updateBoardView()",200);








}







//查看移动过程中是否有障碍物
function noBlockHoriznotal(row,col1,col2,board){
	for(var i=col1+1;i<col2;i++)
		if (board[row][i]!=0)  return false;
	

	return true;
}


//查看垂直移动中是否有障碍物
function noBlockVertical(col,row1,row2,board){
	for(var i=row1+1;i<row2;i++)
		if (board[i][col]!=0)  return false;
	

	return true;
}





//显示移动效果
function showMoveAnimation(fromx,fromy,tox,toy){
	var numberCell=$('number-cell-'+fromx+'-'+fromy);

	numberCell.animate({
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)
	},200);



}

function isgameover(){

	if(nospace(board)&&nomove()){
		alert('gameover');
	}

}
function nomove(){

	if(canMoveDown()||canMoveUp()||canMoveRight()||canMoveLeft()){
		return false;
	}else{
		return true;
	}

}

function updateScore(score){
	$('#score').text(score);
}