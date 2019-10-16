//===================================================================
// three.js �̊e��ݒ�
//===================================================================
var scene = new THREE.Scene();                        // �V�[���̍쐬
var renderer = new THREE.WebGLRenderer({              // �����_���̍쐬
  antialias: true,                                    // �A���`�G�C���A�X�L��
  alpha: true,                                        // canvas�ɓ����x�o�b�t�@����������
});
renderer.setClearColor(new THREE.Color("black"), 0);  // �����_���̔w�i�F
renderer.setSize(640, 480);                           // �����_���̃T�C�Y
renderer.domElement.style.position = "absolute";      // �����_���̈ʒu�͐�Βl
renderer.domElement.style.top = "0px";                // �����_���̏�[
renderer.domElement.style.left = "0px";               // �����_���̍��[
document.body.appendChild(renderer.domElement);       // �����_���� DOM �� body �ɓ����
var camera = new THREE.Camera();                      // �J�����̍쐬
scene.add(camera);                                    // �J�������V�[���ɒǉ�
var light = new THREE.DirectionalLight(0xffffff);     // ���s�����i���j���쐬
light.position.set(0, 0, 2);                          // �J������������Ƃ炷
scene.add(light);                                     // �V�[���Ɍ�����ǉ�
var ambientlight = new THREE.AmbientLight(0x888888);  // ������ǉ�
scene.add(ambientlight);�@�@�@�@�@�@�@�@�@�@�@�@�@�@�@// �V�[���Ɍ�����ǉ�

var ar = new AR(scene, camera);

ar.init();

//===================================================================
// �����_�����O�E���[�v
//===================================================================
function renderScene() { 					// �����_�����O�֐�
	requestAnimationFrame(renderScene);			// ���[�v��v��
	if(source.ready === false)    { return; }		// ���f�B�A�\�[�X�̏������ł��Ă��Ȃ���Δ�����
	context.update(source.domElement);			// ARToolkit�̃R���e�L�X�g���X�V
	ar.update();
  	renderer.render(scene, camera);				// �����_�����O���{
}
renderScene();							// �ŏ���1�񂾂������_�����O���g���K

