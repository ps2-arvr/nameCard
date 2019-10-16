/////////////////////���N���X/////////////////////
function Geometry(marker){
	this.marker = marker;
}

Geometry.prototype = {
	update : function(dt){ },
	createObject : function(){ },
	getInstance  : function(objectName, parentInstance){
		if(objectName == 'rocket'){
			this.arGeometry = new Rocket(parentInstance);
		}else if(objectName == 'earth'){
			this.arGeometry = new Earth(parentInstance);
		}else{
			this.arGeometry = new Video(parentInstance);
		}
		return this.arObject;
	}
};
/////////////////////////////////////////////////////

/////////////////////�q�N���X�i���P�b�g�N���X�̒�`�j/////////////////////
function Rocket(geometryInstance){
	this.geometryInstance = geometryInstance;
}
Rocket.prototype = this.geometryInstance;
Rocket.prototype.createObject = function(){
	var rocketMesh;
	// json�`���̃��f����ǂݍ��ރ��[�_
	var loader = new THREE.JSONLoader();
	// ���f����ǂݍ���
	loader.load("./model/rocketX.json", function(geo, mat) {
		mat = new THREE.MeshPhongMaterial({map:THREE.ImageUtils.loadTexture("./model/rocketX.png")});
		// ���b�V����
		rocketMesh = new THREE.Mesh(geo, mat);
		// ���b�V���̖��O�i��Ńs�b�L���O�Ŏg���j
		rocketMesh.name = "rocket";	
		// �����T�C�Y�i�������킹�j
		rocketMesh.scale.set(0.3, 0.3, 0.3);
		// �����ʒu�i�������킹�j
		rocketMesh.position.set(0, 0.5, 0);
		// ���b�V�����}�[�J�ɒǉ�
		this.marker.add(rocketMesh);
	});
}
////////////////////////////////////////////////////////////////////////

/////////////////////�q�N���X�i�A�[�X�N���X�̒�`�j/////////////////////
function Earth(geometryInstance){
	this.geometryInstance = geometryInstance;
}
Earth.prototype = this.geometryInstance;
Earth.prototype.createObject = function(){
	this.meshEarth = new THREE.Mesh();
	var loaderEarth = new THREE.TextureLoader();
	var textureEarth = loaderEarth.load( './img/earth.png');
	var materialEarth = new THREE.MeshBasicMaterial({ map:textureEarth });
	var geometryEarth = new THREE.SphereGeometry(18,32,32);
	this.meshEarth = new THREE.Mesh( geometryEarth, materialEarth );
	this.meshEarth.position.set(0, 0, 50);
	this.marker.add(this.meshEarth);

	this.meshCloud = new THREE.Mesh();
	var loaderCloud = new THREE.TextureLoader();
	var textureCloud = loaderCloud.load( './img/cloud.png');
	var materialCloud = new THREE.MeshBasicMaterial({ map:textureCloud, transparent:true });
	var geometryCloud = new THREE.SphereGeometry(18.1,32,32);
	this.meshCloud = new THREE.Mesh( geometryCloud, materialCloud );
	this.meshCloud.position.set(0, 0, 50);
	this.marker.add(this.meshCloud);

	var meshMoon = new THREE.Mesh();
	var loaderMoon = new THREE.TextureLoader();
	var textureMoon = loaderMoon.load( './img/moon.png');
	var materialMoon = new THREE.MeshBasicMaterial({ map:textureMoon});
	var geometryMoon = new THREE.SphereGeometry(5,32,32);
	var meshMoon = new THREE.Mesh( geometryMoon, materialMoon );
	this.sceneCenter = new THREE.Scene();

	this.sceneCenter.position.set(0, 0, 50);
	this.sceneCenter.add(meshMoon);
	meshMoon.position.set(0, 0, 50);
	this.marker.add(this.sceneCenter);
}

Earth.prototype.update = function(dt){
	this.meshCloud.rotation.y += dt * 0.1
	this.meshEarth.rotation.y += dt * 0.2
	this.sceneCenter.rotation.y += dt * 0.5;
}
////////////////////////////////////////////////////////////////////////

/////////////////////�q�N���X�i�r�f�I�N���X�̒�`�j/////////////////////
function Video(geometryInstance){
	this.geometryInstance = geometryInstance;
}
Video.prototype = this.geometryInstance;
Video.prototype.createObject = function(){
	//video�v�f
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

	//��������canvas��texture�Ƃ���THREE.Texture�I�u�W�F�N�g�𐶐�
	this.videoTexture = new THREE.Texture(videoImage);
	this.videoTexture.minFilter = THREE.LinearFilter;
	this.videoTexture.magFilter = THREE.LinearFilter;

	//��������video texture��map�Ɏw�肵�Aoverdraw��ture�ɂ��ă}�e���A���𐶐�
	var movieMaterial = new THREE.MeshBasicMaterial({map: videoTexture, overdraw: true, side:THREE.DoubleSide});
	var movieGeometry = new THREE.BoxGeometry(1,0.05,1);
	var movieScreen = new THREE.Mesh(movieGeometry, movieMaterial);

	movieScreen.name = "plane";
	movieScreen.position.set(0, 0.5, 0);
	this.marker.add(movieScreen);
}
Video.prototype.update = function(dt){
	if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
		this.videoImageContext.drawImage(this.video, 0, 0);
		if (this.videoTexture) {
			this.videoTexture.needsUpdate = true;
    		}
  	}
}
////////////////////////////////////////////////////////////////////////
