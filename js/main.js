let setSizes = (canvas) => {
    let height = window.innerHeight,
        width = window.innerWidth
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
}

let viewControl = (coordRotation,coordDisplacement,delta, RotationElement, DisplacementElement, isRotation, speedRotation = 1, speedDisplacement = 1) => 
{
    if (isRotation)
        RotationElement.rotation[coordRotation] += delta * speedRotation
    else
        DisplacementElement.position[coordDisplacement] += delta * speedDisplacement
}

let defineConditionalProperty = (obj,hasProperty,hasVal,defineProperty,defVal) => 
{
    if(obj.hasOwnProperty(hasProperty) && obj[hasProperty]==hasVal)
        obj[defineProperty] = defVal
}

let selectObjectsWithProperty = (container,Property,Val) =>
{
    return Array.prototype.filter.call(container, (obj) => obj[Property]==Val)
}

window.onload = () => {
    let canvas = document.getElementById('canvas'),
        hammer = new Hammer(canvas)
    sceneRotation = true,
        gui = new dat.GUI(),
        lastTouch = true
    hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    hammer.get('pinch').set({ enable: true });

    setSizes(canvas)
    let foo =
    {
        rotation: true,
    }
    gui.add(foo, 'rotation', false, true)

    let renderer = new THREE.WebGLRenderer({ canvas: canvas })
    renderer.setClearColor(0x333333)
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;
	

    let scene = new THREE.Scene()
    scene.rotation.set(0,3.14,0)
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 5000)
    camera.position.set(0, 50, 628)


    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    raycaster.setFromCamera(mouse, camera);


    ablight = new THREE.AmbientLight(0xffffff, 0.5);
	scene.add(ablight);


    light = new THREE.PointLight(0xffffff, 0.5, 3000);
	light.position.set(-200,500,400);
	light.castShadow = true;
	light.shadow.camera.near = 0.1;
	light.shadow.camera.far = 5000;
    scene.add(light);
    light = new THREE.PointLight(0xffffff, 0.5, 3000);
	light.position.set(200,-300,400);
	light.castShadow = true;
	light.shadow.camera.near = 0.1;
	light.shadow.camera.far = 5000;
	scene.add(light);

    let texture = new THREE.TextureLoader().load( "../assets/textures/brick.jpg" );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 4, 4 );

    let loader = new THREE.OBJLoader();
    loader.load('http://usence.com.au/configurator/assets/models/roller.obj',
        ( object ) => 
        {
            object.name = 'Roller'
            object.position.x = 88
            object.position.y = 129
            object.position.z=-115
            object.scale.z = 3
            object.scale.x = 7
            object.scale.y = 20
            scene.add( object )

        },
        ( xhr ) => console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ),
        ( error )=>  console.log( 'An error happened' )
    );

    loader.load('http://usence.com.au/configurator/assets/models/house.obj',
    ( object ) => 
    {
        scene.add( object )
        object.children.forEach((mesh)=>
        {
            if(mesh.material.name != undefined)
                mesh.material.color.setHex(0xfaf1eb)
            Array.prototype.forEach.call(mesh.material,(Material)=>
            {
                if(Material.name=='Glass')
                {
                    Material.transparent=true;
                    Material.opacity=0.4;

                }
                if(Material.name=='Frame')
                {
                    Material.color.setHex(0x066350f)
                    Material.reflectivity = 0.4
                }
            })
        })
    },
    ( xhr ) => console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ),
    ( error )=>  console.log( 'An error happened' )
    );
   
    window.addEventListener('resize', (e) => 
    {
        setSizes(canvas)
    }, false)
    hammer.on('pinch',(e)=>
    {
        if (e.scale>1)
        {
            scale = e.scale
        }
        else
        {
            scale = -1-e.scale
        }
        viewControl('z','z', scale, scene, camera, false , -0.01, -1)
    })
    hammer.on('pan', (e) => 
    {
        /* let Rollers = selectObjectsWithProperty(scene.children,'name','Roller')
        el = Rollers.filter((object) => object.isSelected == true)[0];
        if (typeof el == 'undefined')
        { */
            viewControl('x','y', -e.srcEvent.movementY, scene, scene, foo.rotation , -0.01, 0.1)
            viewControl('y','x', e.srcEvent.movementX, scene, scene, foo.rotation, 0.01, 0.1)
       /*  }
        else
        {
            viewControl('x','y', -e.srcEvent.movementY, el, el, foo.rotation, -0.01, 0.1)
            viewControl('y','x', e.srcEvent.movementX, el, el, foo.rotation, 0.01, 0.1)
        } */
    })

    canvas.addEventListener('wheel', (e) => 
    {
        /* let Rollers = selectObjectsWithProperty(scene.children,'name','Roller')
        el = Rollers.filter((object) => object.isSelected == true)[0];
        if (typeof el == 'undefined')
        { */
            viewControl('z','z',e.deltaY, scene, camera, foo.rotation, 0.01, 0.1)
            console.log(scene.rotation)
        /* }
        else
            viewControl('z','z',e.deltaY, el, el, foo.rotation, -0.01, 0.1) */
    })

    canvas.addEventListener('dblclick', (e) => 
    {
        let Rollers = selectObjectsWithProperty(scene.children,'name','Roller')
        el = Rollers.filter((object) => object.pointerOn == true)[0];
        Rollers.forEach((object) => 
        {
            object.isSelected = false
            object.children.forEach(obj=>
                {
                    obj.material.wireframe = false
                })
            if(object.hasOwnProperty('folder'))
            {
                gui.removeFolder(object.folder)
                delete object.folder
            }
        })
        if (typeof el != 'undefined') 
        {
            console.log(el)
            el.isSelected = true
            el.children.forEach(obj=>obj.material.wireframe=true)
            el.folder = gui.addFolder('Selected Item');
            el.folder.add(el.scale, 'x', 5, 10)
            el.folder.add(el.scale, 'y', 15, 25)
            el.folder.add(el.scale, 'z', 0, 5)
            let params = {}
            params.color = 0xffffff;
            el.folder.addColor(params,'color').onChange(()=>el.children.forEach(obj=>obj.material.color.setHex(params.color)))
        } 

    })
    window.addEventListener('mousemove', (e) => 
    {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
    }, false);

    function loop() 
    {
        raycaster.setFromCamera(mouse, camera);

        let Group = Array.prototype.filter.call(scene.children,(obj)=>obj.type=='Group'),
            Intersect = raycaster.intersectObjects(scene.children,true);
        Group.forEach(obj=>defineConditionalProperty(obj,'name','Roller','pointerOn',false))
        if(Intersect.length>0 && Intersect[0].object.parent.name == 'Roller')
            Intersect[0].object.parent.pointerOn = true
        if(Intersect.length>0 && Intersect[0].object.material.name == 'Glass')
            console.log('a')
        renderer.render(scene, camera)
        requestAnimationFrame(() => { loop() })
    }

    loop()
}