//declaring variables..
  var gameState="PLAY";
  var policeCar,thiefCar,Road;
  var policeCarImg,thiefCarImg,roadImg;
  var vehiclesGroup,vehicles;
  var c1,t1,t2,t3,b1,b2;
  var start,restart,gameover;
  var startImg,restartImg,gameoverImg;
  var fuel,fuelImg,fuelCan;
  var g1,g2;
  var fuelGroup;
  var siron;
  var l1,heart,l2,l3;
  var lc=3;
//loading images..
  function preload(){
    policeCarImg=loadImage("Police Car .png");
    thiefCarImg=loadImage("thiefCar.png");
     roadImg =loadImage("track.jpg"); 
    c1=loadImage("Vehicles/Car1.png");

    t1=loadImage("Vehicles/Truck1.png");
    t2=loadImage("Vehicles/Truck_2.png");
    t3=loadImage("Vehicles/Truck3.png");  
    b1=loadImage("Vehicles/bike1.png");
    b2=loadImage("Vehicles/bike2.png");
    startImg=loadImage("SRG/Start.png");
    restartImg=loadImage("SRG/restart-button-.png");
    gameoverImg=loadImage("SRG/gameOver-.png");
    fuelImg=loadImage("Fuel.png");
    heart=loadImage("heart.png");
    siron=loadSound("mp3/Siron.mp3");



  }

  function setup(){
   createCanvas(displayWidth,displayHeight);
//create road sprite
  Road=createSprite(displayWidth,displayHeight);
  Road.addImage(roadImg); 
  Road.scale=4;
//creating l1,l2,l3 sprite
    l2=createSprite(displayWidth-70,displayHeight-750);
    l2.addImage(heart);
    l2.scale=0.05;

    l3=createSprite(displayWidth-100,displayHeight-750);
    l3.addImage(heart);
    l3.scale=0.05;

    l1=createSprite(displayWidth-40,displayHeight-750);
    l1.addImage(heart);
    l1.scale=0.05;

    //l1.visible=false;
    //l2.visible=false;
    //l3.visible=false;

//creating other sprites
    policeCar=createSprite(300,450,65,100);
    policeCar.addImage(policeCarImg);
    policeCar.scale=0.7;
   

    thiefCar=createSprite(Math.round(random(200,600)),150,30,30);
    thiefCar.addImage(thiefCarImg);
    thiefCar.scale=0.3;

    start=createSprite(400,300,50,50);
    start.addImage(startImg);

    restart=createSprite(400,300,50,50);
    restart.addImage(restartImg);
    restart.scale=0.3;

    gameover=createSprite(400,180,50,50);
    gameover.addImage(gameoverImg);
    gameover.scale=0.8;
    
//setting collider for police and thief cars..
thiefCar.setCollider("rectangle",0,0,thiefCar.width+50,thiefCar.height+300);
     thiefCar.debug=true;

   policeCar.setCollider("rectangle",0,0,policeCar.width-20,policeCar.height-30);
   policeCar.debug=true;

    //creating g1 and g2..
    
    g1=createSprite(displayWidth-30,displayHeight-300,10,1000);
    g1.visible=false;
    g2=createSprite(displayWidth-1350,displayHeight-300,10,1000);
    g2.visible=false;
    vehiclesGroup=createGroup();
    

  }

  function draw(){
   background("gray"); 

    //thiefCar.x=policeCar.x;

//    edges=createEdgeSprites();

   // thiefCar.collide(edges);
   // policeCar.collide(edges);

    //making police cars collide with g1 and g2..
    
    thiefCar.collide(g1);
    thiefCar.collide(g2);

    policeCar.collide(g1);
    policeCar.collide(g2);



//creating gameState play...

    if(gameState === "PLAY"){

      restart.visible=false;
      start.visible=false;
      gameover.visible=false;

      
      
    if (thiefCar.x>50 && thiefCar.x<=380 && thiefCar.isTouching(
    vehiclesGroup)) {
    thiefCar.x=thiefCar.x+50;
    }
   else if (thiefCar.x>=390 && thiefCar.x<750 && thiefCar.isTouching(
    vehiclesGroup)) {
    thiefCar.x=thiefCar.x-50;
    }
      console.log(thiefCar.x)

    if(keyDown(RIGHT_ARROW)){
    policeCar.x+=13;

  }

    if(keyDown(LEFT_ARROW)){
    policeCar.x+=-13;

  }

  if(keyDown(UP_ARROW)){
    policeCar.y+=-13;
    camera.position.x = policeCar.position.x;
    camera.position.y = policeCar.position.y;
  }
//calling function spawnCars(); and spawnfuelCan();
    
        spawnCars();
    spawnfuelCan();

       Road.velocityY=0;




    console.log(lc);
      
      //declaring condition..
    if(policeCar.isTouching(vehiclesGroup)){
      lc=lc-1;
      if (lc>0){
            gameState="RES";
      }
        else if (lc===0){
          gameState="END";
        }


    }


    }
    
    //making gameState res..

    if(gameState === "RES"){

    restart.visible=true;
    //gameover.visible=true;
    vehicles.velocityY=0;
    Road.velocityY=0;
    vehicles.destroy();
    thiefCar.velocityX=0;

//giving mousePressedOver condition..
    if(mousePressedOver(restart)){
        reset();
      }

      }
//making gameState end..
    
    if(gameState === "END") {

          gameover.visible=true;
        vehicles.velocityY=0;
         Road.velocityY=0;
     vehicles.destroy();
         thiefCar.velocityX=0;

      //conditional statement.. 
      
       if(lc===0){

          l1.visible=false;
          l2.visible=false;
          l3.visible=false;

        }

    }

//road .y
    if(Road.y > 600){
      Road.y=200;
    }



    drawSprites();
  }
//making function reset
  function reset(){

    gameState = "PLAY";


    gameover.visible=false;
    restart.visible=false;
    vehiclesGroup.destroyEach();

        /*if(lc=3){

        l1.visible=true;
        l2.visible=true;
        l3.visible=true;
      }*/

        if(lc===2){

        //l1.visible=true;
        //l2.visible=true;
        l3.visible=false;
      }

       else if(lc===1){

        //l1.visible=true;
        l2.visible=false;
        l3.visible=false;
      }


      else if(lc===0){

        l1.visible=false;
        l2.visible=false;
        l3.visible=false;
        gameover.visible=true;

        restart.visible=false;
       //meState="END" 
      }

  }

//making function spawnFuelCan..
  function spawnfuelCan(){

    if(frameCount%500===0){
      fuelCan=createSprite(Math.round(random(150,550)),50,30,30);
      fuelCan.addImage(fuelImg);
      fuelCan.scale=0.3;
      fuelCan.velocityY=9;
      fuelCan.lifeTime=600;
    }

  }
//making function spawnCars...
  function spawnCars(){

  if(frameCount%100===0){
   vehicles=createSprite(Math.round(random(displayWidth-1300,displayWidth-80)),50,30,30);

    var ran=Math.round(random(1,5));
    switch(ran){

        case 1:vehicles.addImage(t1);
        break;
        case 2:vehicles.addImage(t2);
        break;
         case 3:vehicles.addImage(t3);
        break;
         case 4:vehicles.addImage(b1);
        break;
         case 5:vehicles.addImage(b2);
        break;


    }

  vehicles.setCollider("rectangle",0,0,vehicles.width-20,vehicles.height-30);
  vehicles.debug=true;
    vehicles.scale=0.7;

    vehicles.velocityY=16;
    vehicles.lifeTime=600;

  vehiclesGroup.add(vehicles);
  }  


  }