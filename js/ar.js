class AR{
	constructor(scene, camera){
		this.scene = scene;
		this.camera = camera;
	}

	init(){
		//===================================================================
		// arToolkitSource�i�}�[�J�g���b�L���O���郁�f�B�A�\�[�X�j
		//===================================================================
		var source = new THREEx.ArToolkitSource({             // arToolkitSource�̍쐬
			sourceType: "webcam",                         // Web�J�����ݒ�
		});

		source.init(function onReady() {                      // �\�[�X�����������A�������ł�����
  			onResize();                                   // ���T�C�Y����
		});

		//===================================================================
		// arToolkitContext�i�J�����p�����[�^�A�}�[�J���o�ݒ�j
		//===================================================================
		this.context = new THREEx.ArToolkitContext({							 // arToolkitContext�̍쐬
  			debug: false,                                    // �f�o�b�O�p�L�����o�X�\���i�f�t�H���gfalse�j
  			cameraParametersUrl: "./data/camera_para.dat",   // �J�����p�����[�^�t�@�C��
  			detectionMode: "mono",                           // ���o���[�h�icolor/color_and_matrix/mono/mono_and_matrix�j
  			imageSmoothingEnabled: true,                     // �摜���X���[�W���O���邩�i�f�t�H���gfalse�j
  			maxDetectionRate: 60,                            // �}�[�J�̌��o���[�g�i�f�t�H���g60�j
  			canvasWidth: source.parameters.sourceWidth,      // �}�[�J���o�p�摜�̕��i�f�t�H���g640�j
  			canvasHeight: source.parameters.sourceHeight,    // �}�[�J���o�p�摜�̍����i�f�t�H���g480�j
		});
		this.context.init(function onCompleted(){		  			// �R���e�N�X�g������������������
			this.camera.projectionMatrix.copy(this.context.getProjectionMatrix());  // �ˉe�s����R�s�[
		});
		
		window.addEventListener("resize", function() {		// �E�B���h�E�����T�C�Y���ꂽ��
  			onResize();                                     // ���T�C�Y����
		});
		
		function onResize(){
  			source.onResizeElement();                           // �g���b�L���O�\�[�X�����T�C�Y
  			source.copyElementSizeTo(renderer.domElement);      // �����_���������T�C�Y��
  			if(context.arController !== null){                  // arController��null�łȂ����
    				source.copyElementSizeTo(context.arController.canvas);  // ����������T�C�Y��
  			} 
		}

		//===================================================================
		// ArMarkerControls�i�}�[�J�ƁA�}�[�J���o���̕\���I�u�W�F�N�g�j
		//===================================================================
		var marker = new THREE.Group();

		//�p�����[�^���玫���f�[�^�����擾
		var string = new String();
		var dictionaryName = string.getValue('marker_name');

		if(dictionaryData == null){
			alert('DictionaryData is undefined');
			return null;
		}

		var dictionaryData = "./data/" + dictionaryName + ".patt";

		var controls = new THREEx.ArMarkerControls(context, marker, {    // �}�[�J��o�^
  			type: "pattern",					 // �}�[�J�̃^�C�v
  			patternUrl: dictionaryData,				 // �}�[�J�t�@�C��
		});

		this.scene.add(marker);
		
		var geometry = new Geometry(marker);

		this.arObject = geometry.getInstance(dictionaryName, geometry);
		
		this.arObject.createObject();

	}

	function update(){
		this.arObject.update(dt);
	}
}
