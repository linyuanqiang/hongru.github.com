var cube5 = function (id) {
		var canvas = document.getElementById(id);
		var stage = new CVS.$stage(canvas);
		var focalLength = 250,
			ballN = 20,
			balls = [],
			areas = [],
			vpx = 0,
			vpy = 0,
			
			angleY = 0,
			angleX = 0,
			ag = 0,
			createTriangle = CVS.createTriangle;
			
		var cube = [
			[-100, -100, -100],
			[100, -100, -100],
			[100,  100, -100],
			[-100,  100, -100],
			[-100, -100, 100],
			[ 100, -100, 100],
			[100,  100, 100],
			[-100,  100, 100]
		],
		triangles = [];

			vpx = canvas.width / 2;
			vpy = canvas.height / 2;
		for (var i=0; i<cube.length; i++) {

			var ball = CVS.createPoint3D(stage.ctx, function () {
				this.xpos = cube[i][0];
				this.ypos = cube[i][1];
				this.zpos = cube[i][2];
				this.width = 0;
				this.draw = function () {
					this.ctx.beginPath();
					this.ctx.arc(0, 0, this.width/2, 0, Math.PI*2, true);
					this.ctx.closePath();
					this.ctx.fill();
				};
			});
			ball.setVanishPoint(vpx, vpy);
			ball.setCenterPoint(0, 0, 600);
			stage.addChild(ball);
			balls.push(ball);
		}
		
		 //front
		triangles[0] = createTriangle(stage.ctx, balls[0], balls[1], balls[2], 0x6666cc, false);
		triangles[1]  = createTriangle(stage.ctx, balls[0], balls[2], balls[3], 0x6666cc, false);
		//top
		triangles[2]  = createTriangle(stage.ctx, balls[0], balls[5], balls[1], 0x66cc66, false);
		triangles[3]  = createTriangle(stage.ctx, balls[0], balls[4], balls[5], 0x66cc66, false);
		//back
		triangles[4]  = createTriangle(stage.ctx, balls[4], balls[6], balls[5], 0xcc6666, false);
		triangles[5]  = createTriangle(stage.ctx, balls[4], balls[7], balls[6], 0xcc6666, false);
		//bottom
		triangles[6]  = createTriangle(stage.ctx, balls[3], balls[2], balls[6], 0xcc66cc, false);
		triangles[7]  = createTriangle(stage.ctx, balls[3], balls[6], balls[7], 0xcc66cc, false);
		//right
		triangles[8]  = createTriangle(stage.ctx, balls[1], balls[5], balls[6], 0x66cccc, false);
		triangles[9]  = createTriangle(stage.ctx, balls[1], balls[6], balls[2], 0x66cccc, false);
		//left
		triangles[10] = createTriangle(stage.ctx, balls[4], balls[0], balls[3], 0xcccc66, false);
		triangles[11] = createTriangle(stage.ctx, balls[4], balls[3], balls[7], 0xcccc66, false);

		/*stage.addEventListener('mousemove', function (x, y) {
			angleY = (x - vpx) * .0005;
            angleX = (y - vpy) * .0005;
		});*/
		
		
		var light = CVS.createLight();

		for (var i = 0; i < triangles.length; i ++) {
			triangles[i].light = light;
		}
		

		stage.onRefresh = function () { 
			ag += 0.01;
			angleX = Math.cos(ag)*100*.0005;
			angleY = Math.sin(ag)*100*.0005;
			for (var i=0,ball; ball=balls[i]; i++) { 
			   ball.rotateX(angleX);
			   ball.rotateY(angleY);

			   ball.x = ball.screenX;
			   ball.y = ball.screenY;
            }

            triangles.sort(function (a, b) { return b.depth - a.depth })
			for (var j = 0; j < triangles.length; j ++) {
				triangles[j].draw();
			}
		}

		stage.start();
	};