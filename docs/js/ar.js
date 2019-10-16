var clock = new THREE.Clock();

class ARObject{
	constructor(scene, camera){
		this.scene = scene;
		this.camera = camera;
		this.arObject = null;
	}

	init(){
		//===================================================================
		// arToolkitSource（マーカトラッキングするメディアソース）
		//===================================================================
		this.source = new THREEx.ArToolkitSource({             // arToolkitSourceの作成
			sourceType: "webcam",                         // Webカメラ設定
		});

		this.source.init(function onReady() {                      // ソースを初期化し、準備ができたら
  			this.onResize();                                   // リサイズ処理
		});

		//===================================================================
		// arToolkitContext（カメラパラメータ、マーカ検出設定）
		//===================================================================
		this.context = new THREEx.ArToolkitContext({							 // arToolkitContextの作成
  			debug: false,                                    // デバッグ用キャンバス表示（デフォルトfalse）
  			cameraParametersUrl: "./data/camera_para.dat",   // カメラパラメータファイル
  			detectionMode: "mono",                           // 検出モード（color/color_and_matrix/mono/mono_and_matrix）
  			imageSmoothingEnabled: true,                     // 画像をスムージングするか（デフォルトfalse）
  			maxDetectionRate: 60,                            // マーカの検出レート（デフォルト60）
  			canvasWidth: this.source.parameters.sourceWidth,      // マーカ検出用画像の幅（デフォルト640）
  			canvasHeight: this.source.parameters.sourceHeight,    // マーカ検出用画像の高さ（デフォルト480）
		});
		this.context.init(function onCompleted(){		  			// コンテクスト初期化が完了したら
			this.camera.projectionMatrix.copy(this.context.getProjectionMatrix());  // 射影行列をコピー
		});
		

		//===================================================================
		// ArMarkerControls（マーカと、マーカ検出時の表示オブジェクト）
		//===================================================================
		var marker = new THREE.Group();

		//パラメータから辞書データ名を取得
		var string = new String();
		var dictionaryName = string.getValue('marker_name');

		if(dictionaryName == null){
			alert('dictionaryName dose not exit');
			return null;
		}

		var dictionaryData = "./data/" + dictionaryName + ".patt";

		var controls = new THREEx.ArMarkerControls(this.context, marker, {    // マーカを登録
  			type: "pattern",					 // マーカのタイプ
  			patternUrl: dictionaryData,				 // マーカファイル
		});

		this.scene.add(marker);
		
		this.arObject = Geometry.getInstance(dictionaryName);
		this.arObject.setMarkerObject(marker);
		this.arObject.createObject();
	}

	onResize(){
		this.source.onResizeElement();                           // トラッキングソースをリサイズ
  		this.source.copyElementSizeTo(renderer.domElement);      // レンダラも同じサイズに
  		if(this.context.arController !== null){                  // arControllerがnullでなければ
    			this.source.copyElementSizeTo(this.context.arController.canvas);  // それも同じサイズに
		}
	}


	update(){
		this.arObject.update(clock.getDelta());
	}
}
