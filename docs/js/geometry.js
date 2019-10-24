let geometryInstance = null;
let arMarker = null;

//------------------基底クラス--------------------
class Geometry {
	constructor(){
	}

	update(dt){
	}

	createObject(){
	}

	setMarkerObject(marker){
		arMarker = marker;
	}

	static getInstance(objectName){
		if(geometryInstance != null){
			return geometryInstance;
		}
		if(objectName == 'rocket'){
			geometryInstance = new Rocket();
		}else if(objectName == 'earth'){
			geometryInstance = new Earth();
		}else{
			geometryInstance = new Video();
		}
		return geometryInstance;
	}

}
//-------------------------------------------------

//-------------子クラス（Rocketクラス）------------
class Rocket extends Geometry{
	
	createObject(){
		var geo = new THREE.CubeGeometry(1, 1, 1);          // cube ジオメトリ（サイズは 1x1x1）
		var mat = new THREE.MeshNormalMaterial({            // マテリアルの作成
  		transparent: true,                                  // 透過
  		opacity: 0.8,                                       // 不透明度
		side: THREE.DoubleSide,                             // 内側も描く
	});
		var rocketMesh;
		// json形式のモデルを読み込むローダ
		var loader = new THREE.JSONLoader();
		// モデルを読み込む
		loader.load("./model/rocketX.json", function(geo, mat) {
			mat = new THREE.MeshPhongMaterial({map:THREE.ImageUtils.loadTexture("./model/rocketX.png")});
			// メッシュ化
			rocketMesh = new THREE.Mesh(geo, mat);
			// メッシュの名前（後でピッキングで使う）
			rocketMesh.name = "rocket";	
			// 初期サイズ（現物合わせ）
			rocketMesh.scale.set(2.0, 2.0, 2.0);
			// 初期位置（現物合わせ）
			rocketMesh.position.set(-1.5, 0.5, 0);
			// メッシュをマーカに追加
			arMarker.add(rocketMesh);
		});
	}
}
//-------------------------------------------------

//-------------子クラス（Earthクラス）------------
class Earth extends Geometry{

	createObject(){
		this.meshEarth = new THREE.Mesh();
		var loaderEarth = new THREE.TextureLoader();
		var textureEarth = loaderEarth.load( './image/earth_tex.png');
		var materialEarth = new THREE.MeshBasicMaterial({ map:textureEarth });
		var geometryEarth = new THREE.SphereGeometry(3.0,32.0,32.0);
		this.meshEarth = new THREE.Mesh( geometryEarth, materialEarth );
		this.meshEarth.position.set(-2.0, 0.5, 0);
		arMarker.add(this.meshEarth);

		this.meshCloud = new THREE.Mesh();
		var loaderCloud = new THREE.TextureLoader();
		var textureCloud = loaderCloud.load( './image/cloud_tex.png');
		var materialCloud = new THREE.MeshBasicMaterial({ map:textureCloud, transparent:true });
		var geometryCloud = new THREE.SphereGeometry(3.1,32.0,32.0);
		this.meshCloud = new THREE.Mesh( geometryCloud, materialCloud );
		this.meshCloud.position.set(-1.5, 0.5, 0);
		arMarker.add(this.meshCloud);

		this.meshMoon = new THREE.Mesh();
		var loaderMoon = new THREE.TextureLoader();
		var textureMoon = loaderMoon.load( './image/moon_tex.png');
		var materialMoon = new THREE.MeshBasicMaterial({ map:textureMoon});
		var geometryMoon = new THREE.SphereGeometry(1.0,32.0,32.0);
		var meshMoon = new THREE.Mesh( geometryMoon, materialMoon );
		//this.sceneCenter = new THREE.Scene();

		//this.sceneCenter.position.set(0, 0.5, 0);
		//this.sceneCenter.add(meshMoon);
		this.meshMoon.position.set(-2.0, 0, 2.0);
		//arMarker.add(this.sceneCenter);
		arMarker.add(this.meshMoon);
	}

	update(dt){
		this.meshCloud.rotation.y += dt * 0.1;
		this.meshEarth.rotation.y += dt * 0.2;
		//this.sceneCenter.rotation.y += dt * 0.5;
		this.meshMoon.rotation.y += dt * 0.5;

	}
}
//-------------------------------------------------

//-------------子クラス（Videoクラス）------------
class Video extends Geometry{

	createObject(){
		//video要素
		this.video = document.createElement( 'video' );
		this.video.loop = true;
		this.video.muted = true;
		this.video.src = './video/PexelsVideos.mp4';
		this.video.setAttribute( 'muted', 'muted' );
		this.video.play();

		var videoImage = document.createElement('canvas');
		videoImage.width = 1280;
		videoImage.height = 720;

		this.videoImageContext = videoImage.getContext('2d');
		this.videoImageContext.fillStyle = '#000000';
		this.videoImageContext.fillRect(0, 0, videoImage.width, videoImage.height);

		//生成したcanvasをtextureとしてTHREE.Textureオブジェクトを生成
		this.videoTexture = new THREE.Texture(videoImage);
		this.videoTexture.minFilter = THREE.LinearFilter;
		this.videoTexture.magFilter = THREE.LinearFilter;

		//生成したvideo textureをmapに指定し、overdrawをtureにしてマテリアルを生成
		var movieMaterial = new THREE.MeshBasicMaterial({map: this.videoTexture, overdraw: true, side:THREE.DoubleSide});
		var movieGeometry = new THREE.BoxGeometry(5.5,0.05,5.5);
		var movieScreen = new THREE.Mesh(movieGeometry, movieMaterial);

		movieScreen.name = "plane";
		movieScreen.position.set(-2.0 0.5, 0);
		arMarker.add(movieScreen);
	}

	update(dt){
		if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
			this.videoImageContext.drawImage(this.video, 0, 0);
			if (this.videoTexture) {
				this.videoTexture.needsUpdate = true;
    			}
  		}
	}
}
//-------------------------------------------------
