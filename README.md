# KEYCAM WITH ANGULAR 4 ?

Projet Android for Embedded Software Development based on Android at BJTU (Beijing Jiaotong University)

#### Motivation and ambition

The project was born during a SOFTWARE PROJECT TRAINING 2 course at Beijing Jiaotong University in China between one team who wanted to create an Web app entirely based on functionality. I (Vireth) think to make an Web site since the first time I started to learn ANGULAR 4. In love with programming, I wanted to share it through an easy access application so everybody can join and try it. "KEYCAM" ambition is to place programming in the middle of a funny, entertaining so everybody even beginners can enjoy programming and hopefully start learning programming languages afterward.

## Structure

    .
    ├── e2e                     # Test unitaire
    ├── node_modules            # Lib Nod
    └── src                     # Source file
        ├── app                 # Component Service .html .ts .css
        |     ├── Camera        # Functionnality for camera
        |     ├── Creat         # Modal for creation user
        |     ├── Information   # Configuration of toast
        |     ├── Login         # Modal for login user
        |     ├── Service       # All service Http for the website 
        |     └── other         # app.module.ts / app-routing.module.ts
        ├── assets              # Images / Icones / Traduction
        |     ├── i18n          # Source for traduction en/fr/se
        |     ├── icones        # Source for icone of website
        |     └── team          # Source for image of team
        ├── environments        # Different configuration for prod / dev
        └── other               # Index.html / Some configuration

## Examples Activity

#### Flash Activity

    /.../
    
    mCameraManager = (CameraManager) getSystemService(Context.CAMERA_SERVICE);
    
    try {
        mCameraId = mCameraManager.getCameraIdList()[0];
    } catch (CameraAccessException e) {
        e.printStackTrace();
    }

    try {
	if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
	    mCameraManager.setTorchMode(mCameraId, true);
        }
    } catch (Exception e) {
        e.printStackTrace();
    }
    
    /.../

Full code [here](https://github.com/vireth20/Android_BJTU/blob/master/mobile/src/main/java/com/example/vireth/doyourphonesuck/FlashActivity.java)

#### Camera Activity

    @Override
    public void onCreate(Bundle savedInstanceState) {
        /.../
	
        Intent cameraIntent = new Intent(android.provider.MediaStore.ACTION_IMAGE_CAPTURE);
        startActivityForResult(cameraIntent, CAMERA_REQUEST);
    }
    
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == CAMERA_REQUEST && resultCode == Activity.RESULT_OK) {
            Bitmap photo = (Bitmap) data.getExtras().get("data");
            imageView.setImageBitmap(photo);
        }
    }
	
Full code [here](https://github.com/vireth20/Android_BJTU/blob/master/mobile/src/main/java/com/example/vireth/doyourphonesuck/CameraFront.java)

## Examples Api System Test

#### Flash Activity

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        /.../

        Boolean isFlashAvailable = getApplicationContext().getPackageManager()
		.hasSystemFeature(PackageManager.FEATURE_CAMERA_FLASH);

        if (!isFlashAvailable) {
            AlertDialog alert = new AlertDialog.Builder(this).create();
            alert.setTitle("Error !!");
            alert.setMessage("Your device doesn't support flash light!");
            alert.setButton(DialogInterface.BUTTON_POSITIVE, "OK", new DialogInterface.OnClickListener() {
                public void onClick(DialogInterface dialog, int which) {
                    finish();
                    System.exit(0);
                }
            });
            alert.show();
            return;
    }

Full code [here](https://github.com/vireth20/Android_BJTU/blob/master/mobile/src/main/java/com/example/vireth/doyourphonesuck/FlashActivity.java)

## Examples Test Unitaire & UI

#### Keyboard Activity

	public void KeyboardActivityTest(View view) {
    		EditText KeyboardEditText =
            		(EditText) findViewById(R.id.KeyboardEditText);

    		String name = greetKeyboardText.getText().toString();
    		String greeting = String.format("Sun Wukong, %s!", name);

    		TextView messageTextView =
            	(TextView) findViewById(R.id.messageTextView);

    		messageTextView.setText(greeting);
	}

Full code [here](https://github.com/vireth20/Android_BJTU/blob/master/mobile/src/main/java/com/example/vireth/doyourphonesuck/Keyboard.java)

## Team & Credits

[![Keysim](https://raw.githubusercontent.com/keysim/gearobot/master/doc/img/vireth.png)](http://vireth.com) | [![Vireth](https://raw.githubusercontent.com/keysim/gearobot/master/doc/img/vireth.png)](http://vireth.com)
---|---
:chicken: [Vireth Thach sok](vireth.com) | :monkey: [Vireth Thach sok](vireth.com)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2017 Vireth
