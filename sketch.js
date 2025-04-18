let rob1;
let rob2;
let rob3;
let rob4;
let circle_r;
let i=0;
let r_image;
let l_image;
let d_image;
let u_image;
let x=400;
let y=300;
let robots=[];
let arrows=[];
let coin;
let score=0;
let door;
let limb;
let ant;
let counter=0;
let cnv;


function setup(){

	createCanvas(800,600);

	//cnv.parent('#canvas_container');
	

	for(let j = 0; j<6; j++){
	
		for(let i = j; i<6;i++){

			arrows.push(new Arrow(width/7*j+100,height/7*i+50,int(random(1,5))));
			arrows.push(new Arrow(width/7*i+100,height/7*j+50,int(random(1,5))));

		}

	}

	r_image= loadImage("images/arrow_right.png");
	l_image= loadImage("images/arrow_left.png");
	u_image= loadImage("images/arrow_up.png");
	d_image= loadImage("images/arrow_down.png");

	//objective: collect coins
	coin = loadImage("images/coin.png");


	//antenna
	ant = loadImage("images/ret.png")

	//door
	door= loadImage("images/door2.png");


	
}



function draw(){
	background(128);

	fill(0);
	textSize(15);
	text("Score: "+score,10,20);


  	for(let i=0; i<1; i++){

		if(frameCount % 130 === 0)
			robots.push(new Robot(-50, height/2,"right"));


		

	}


    fill(255);
  	text("Robots: "+counter,720,447);


	for (let i = 0; i < robots.length; i++) {
    	robots[i].move();
    	robots[i].display();


  			
  		if(robots[i].door_d<100 && robots[i].point_awarded==false){
  			counter++;
  			robots[i].point_awarded=true;



  			}


  	



    	//push robot out of array if out of screen
    	if(robots[i].x > width){
			robots.splice(i,1);
		}

		if(robots[i].x < -75){
			robots.splice(i,1);
		}

		else if(robots[i].y > height){
			robots.splice(i,1);
		}

		else if(robots[i].y+robots[i].head_size+robots[i].body_size < 0){
				robots.splice(i,1);
		}

		//console.log(robots.length);


  	}


  	

  	for (let i = 0; i < arrows.length; i++) {
    	arrows[i].display();

  	}
  



	//display doors
	image(door,width-110,height-160,150,180);


}


function mouseClicked(){



	for (let i = 0; i < arrows.length; i++) {
    	arrows[i].check_click();

  	}



}




class Robot{

	constructor(x,y,dir){
		this.x=x;
		this.y=y;
		this.c_head=color(random(255),random(255),random(255));
		this.c_body=color(random(255),random(255),random(255));
		this.c_arm=color(random(255),random(255),random(255));
		this.head_size=random(25,50);
		this.body_size=random(55,57);
		this.eye_size=5;
		this.dir=dir;
		this.eye_type=int(random(0,2));
		this.arm_size=random(30,45);
		this.limb=int(random(0,2));
		this.door_d;
		this.point_awarded=false;
		
		
	}

	display(){


		//body
		noStroke();
		fill(this.c_body);
		rect(this.x+this.head_size/2,this.y+this.head_size,this.body_size, this.body_size);
		
		//head
		fill(this.c_head);
		rect(this.x+this.body_size/2,this.y,this.head_size,this.head_size);

		//choose limb type (antenna or arms)
		if(this.limb==1){

			image(ant,this.x+(this.body_size+this.head_size)/1.5-this.head_size/2.5,this.y-this.head_size,35,35);


		}

		else if(this.limb==0){

			fill(this.c_arm);
			rect(this.x+6+this.head_size/3,this.y+this.head_size,10, 40)
			rect(this.x+this.body_size+12,this.y+this.head_size,10, 40)

		}
	

		//choosing eye type

		if(this.eye_type==1){

			//eye1 
			fill(255);
			rect(this.x+this.head_size+this.head_size/4, this.y+this.head_size/4,this.head_size/5,this.head_size/5);
			rect(this.x+this.head_size-this.head_size/4+5, this.y+this.head_size/4,this.head_size/5,this.head_size/5);


		}

		else if(this.eye_type==0){

			//eye2
			fill(255);
			rect(this.x+this.head_size/2+20, this.y+this.head_size/5,this.head_size/2,this.head_size/5);


		}

	}


	move(){

		if(this.dir=="right"){

			this.x+=1;

			i = i+1;

			 if (i % 5 === 0){
    			// fill with 50
    			fill(255,255,0);
 
    			ellipse((this.x+this.body_size/2)-((this.body_size-this.head_size)/2),this.y+(this.body_size+this.head_size)/1.5,this.body_size/2,this.body_size/2);
		
   
  				} 
  			else {
  				
  				fill(255,255,0,160);
    
    			
    			ellipse((this.x+this.body_size/2)-((this.body_size-this.head_size)/2),this.y+(this.body_size+this.head_size)/1.5,this.body_size/2,this.body_size/2);
    			
  			}


		}

		if(this.dir=="left"){

			this.x-=1;
			i = i+1;

			 if (i % 5 === 0){
    			// fill with 50
    			fill(255,255,0);
    			
  				ellipse((this.x+this.body_size/2)-((this.body_size-this.head_size)/2)+this.body_size,this.y+(this.body_size+this.head_size)/1.5,this.body_size/2,this.body_size/2);
   
  				} 
  			else {
  				
  				fill(255,255,0,160);
    
    			
    			ellipse((this.x+this.body_size/2)-((this.body_size-this.head_size)/2)+this.body_size,this.y+(this.body_size+this.head_size)/1.5,this.body_size/2,this.body_size/2);
    			
  			}

		}

		if(this.dir=="up"){

			this.y-=1;

			i = i+1;

			 if (i % 5 === 0){
    			// fill with 50
    			fill(255,255,0);
  				ellipse(this.x+(this.body_size+this.head_size)/1.5-this.head_size/2.5,this.y+this.body_size+this.head_size,this.body_size/2,this.body_size/2);
   
  				} 
  			else {
  				
  				fill(255,255,0,160);
    			ellipse(this.x+(this.body_size+this.head_size)/1.5-this.head_size/2.5,this.y+this.body_size+this.head_size,this.body_size/2,this.body_size/2);
    			
  			}	

		}


		if(this.dir=="down"){

			this.y+=1;

			i = i+1;

			 if (i % 5 === 0){
    			// fill with 50
    			fill(255,255,0);
  
  				ellipse(this.x+(this.body_size+this.head_size)/1.5-this.head_size/2.5,this.y,20,20);
   
  				} 
  			else {
  				fill(255,255,0,160);
    
    			
    			ellipse(this.x+(this.body_size+this.head_size)/1.5-this.head_size/2.5,this.y,20,20);
    			
  			}

		}

		




	for (let i = 0; i < arrows.length; i++) {
		let change= dist(this.x-10,this.y,arrows[i].x-10,arrows[i].y);
	
    	
    	if(change<25){

    	


    		if(arrows[i].dir==1)//
    			this.dir="right";

    		else if(arrows[i].dir==2)
    			this.dir="left";
       		else if(arrows[i].dir==3)
    			this.dir="up";

      		else if(arrows[i].dir==4)
    			this.dir="down";

	}



  			}



  			this.door_d=dist(this.x,this.y,730,520);


  		




	}

}


class Arrow{

	constructor(x,y,dir){
		this.x=x;
		this.y=y;
		this.dir=dir;
		this.size=45;
		this.obj=int(random(1,5));
		this.ox=x;
		this.oy=y;

	}


	display(){



		if(this.dir==1){

			image(r_image,this.x,this.y,this.size);

		}

		else if(this.dir==2){

			image(l_image,this.x,this.y,this.size);

		}

		else if(this.dir==3){

			image(u_image,this.x,this.y,this.size);
			

		}

		else if(this.dir==4){

			image(d_image,this.x,this.y,this.size);

		}

	
		
	for(let i=0; i<robots.length;i++){
		let di=dist(this.ox,this.oy,robots[i].x,robots[i].y);

		if(di<30){
			this.ox=1000;
			this.oy=1000;
			score+=1;
		}
	}


		if(this.obj==1){
			image(coin,this.ox,this.oy,this.size/2,this.size/2);
		}


	}


	check_click(){

		//mouseY > this.y && mouseY < this.y+this.size && mouseX > this.x && mouseX < this.x+this.size
		
		let d=dist(mouseX, mouseY, this.x,this.y);

		if(d<40){
			if(this.dir==1){
				this.dir=4;
						
				}

			else if(this.dir==2){
				this.dir=3;
							
				}

			else if(this.dir==3){
				this.dir=1;
							
						
				}

			else if(this.dir==4){
				this.dir=2;
									
				}

			}
	
		}

	}

