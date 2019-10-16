var clock = new THREE.Clock();
var source, context;

class ARObject{
	constructor(scene, camera){
		this.scene = scene;
		this.camera = camera;
		this.arObject = null;
	}

	init(renderer){
		//===================================================================
		// arToolkitSource（マーカトラッキングするメディアソース）
		//===================================================================
		source = new THREEx.ArToolkitSource({             // arToolkitSourceの作成
			sourceType: "webcam",                         // Webカメラ設定
		});

		source.init(function onReady() {                      // ソースを初期化し、準備ができたら
  			onResize();                                   // リサイズ処理
		});

		//===================================================================
		// arToolkitContext（カメラパラメータ、マーカ検出設定）
		//===================================================================
		context = new THREEx.ArToolkitContext({							 // arToolkitContextの作成
  			debug: false,                                    // デバッグ用キャンバス表示（デフォルトfalse）
  			cameraParametersUrl: "./data/camera_para.dat",   // カメラパラメータファイル
  			detectionMode: "mono",                           // 検出モード（color/color_and_matrix/mono/mono_and_matrix）
  			imageSmoothingEnabled: true,                     // 画像をスムージングするか（デフォルトfalse）
  			maxDetectionRate: 60,                            // マーカの検出レート（デフォルト60）
  			canvasWidth: source.parameters.sourceWidth,      // マーカ検出用画像の幅（デフォルト640）
  			canvasHeight: source.parameters.sourceHeight,    // マーカ検出用画像の高さ（デフォルト480）
		});
		context.init(function onCompleted(){		  			// コンテクスト初期化が完了したら
			this.camera.projectionMatrix.copy(context.getProjectionMatrix());       // 射影行列をコピー
		});
		
		//===================================================================
		// リサイズ処理
		//===================================================================
		window.addEventListener("resize", function() {		// ウィンドウがリサイズされたら
			onResize();                                     // リサイズ処理
		});

		function onResize(){
			source.onResizeElement();                           // トラッキングソースをリサイズ
  			source.copyElementSizeTo(renderer.domElement);      // レンダラも同じサイズに
  			if(context.arController !== null){                  // arControllerがnullでなければ
    				source.copyElementSizeTo(context.arController.canvas);  // それも同じサイズに
  			} 
		}

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

		var controls = new THREEx.ArMarkerControls(context, marker, {    // マーカを登録
  			type: "pattern",					 // マーカのタイプ
  			patternUrl: dictionaryData,				 // マーカファイル
		});

		this.scene.add(marker);
		
		this.arObject = Geometry.getInstance(dictionaryName);
		this.arObject.setMarkerObject(marker);
		this.arObject.createObject();
	}

	update(){
		if(source.ready === false)    { return; }		// メディアソースの準備ができていなければ抜ける
		context.update(source.domElement);			// ARToolkitのコンテキストを更新
		this.arObject.update(clock.getDelta());
	}
}
