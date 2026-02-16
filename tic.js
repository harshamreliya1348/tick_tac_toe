let boxes= document.querySelectorAll(".inner");
let reset =document.querySelector(".reset");
let para = document.querySelector("#win");
let newgame = document.querySelector("#new");
let click_sound=document.querySelector("#clicksound");
let winner_sound=document.querySelector("#winnersound");
let victory_sound=document.querySelector("#victorysound");
let count =0;
let series = 0;
let player_H = 0;
let player_T = 0;
let player1=document.querySelector("#player_O");
let player2=document.querySelector("#player_x");
let playerO=true;//fort player O

  const winning= [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
  ];
    let background=()=>{
       for(let box of boxes){
           box.style.backgroundColor="";
       }
    }
    const gamedraw=()=>{
      para.innerText="Game is Draw";
      series++;
      count=0;
    }
  const resetGame = () =>{
    click_sound.currentTime=0;
    click_sound.play();
    playerO=true;
    enablebtn();
    count=0;
    para.innerText="";  
    background(); 
  }
  const New = () =>{
    click_sound.currentTime=0;
    click_sound.play();
    series=0;
    count=0;
    playerO=true;
    enablebtn();
    para.innerText="";  
    background(); 
    count=0;
    player_H=0;
    player1.innerText=player_H;
    player_T=0;
    player2.innerText=player_T;

  }

  boxes.forEach((box)=> {
    box.addEventListener("click",()=>{
       click_sound.currentTime=0;
      click_sound.play();
    if(playerO){
       box.innerText="O";
       box.style.color="#6ae";
       playerO=false;
    }else{
      box.innerText="X";
      box.style.color="red";
      playerO=true;
    }
    count++;
    box.disabled=true;
    let winner = checkwinner();
    if(winner){
      return;
    }
    if(count===9 && !winner){
        gamedraw();
    }
    })
   
  });

  const disablebtn=()=>{
    for(let box of boxes){
      box.disabled=true;
    }
  }

  const enablebtn=()=>{
    for(let box of boxes){
      box.disabled=false;
      box.innerText="";
    }
  }

  showwinner =(winner)=>{
    para.innerText="Winner is "+winner ;
  }
   const checkwinner=()=>{
    for(let pattern of winning){
      let posi1=boxes[pattern[0]].innerText;
      let posi2=boxes[pattern[1]].innerText;
      let posi3=boxes[pattern[2]].innerText;

      if(posi1 != "" && posi2 != "" && posi3 != ""){
         if(posi1===posi2 && posi2===posi3){
          winner_sound.currentTime=0;
          boxes[pattern[0]].style.backgroundColor="green";
          boxes[pattern[1]].style.backgroundColor="green";
          boxes[pattern[2]].style.backgroundColor="green";
          winner_sound.play();
          if(posi1==="O"){
            player_H++;
            series++;
            player1.innerText=player_H;
          }else{
            series++;
            player_T++;
            player2.innerText=player_T;
          } 
            
          if(series==5){
            if( player1.innerText > player2.innerText){
              victory_sound.currentTime=0;
              victory_sound.play();
              alert("O is a winner of this Series , Please start new Game");
             } 
             else if( player2.innerText > player1.innerText){
                victory_sound.currentTime=0;
                victory_sound.play();
                alert("X is a winner of this Series , Let's start new Game");
             }
             else if(player2.innerText = player1.innerText){
              alert("series is Draw, Please start new Game");
             }

          }
          
          showwinner(posi1);
          disablebtn();
          return true;
         }
      }
    }
    return false;
  }
  reset.addEventListener("click",resetGame);
 newgame.addEventListener("click",New);