// Конфигурация глобуса
const GLOBE_CONFIG = {
    wireframeColor: 0xffffff,
    wireframeOpacity: 0.8,
    equatorColor: 0xffffff,
    equatorOpacity: 1.0,
    backgroundColor: 0x00000000,
    sphereRadius: 5.8, // Увеличено с 5.0
    tiltAngle: Math.PI / 4,
    rotationSpeed: 0.001,
    linesCount: 24
};

// Класс 3D глобуса
class WireframeGlobe {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.loadingElement = this.container.querySelector('.globe-loading');
        this.isMobile = window.innerWidth <= 768;
        this.init();
    }

    init() {
        this.createScene();
        this.createGlobe();
        this.setupLighting();
        
        this.globeGroup.rotation.x = GLOBE_CONFIG.tiltAngle;
        this.hideLoading();
        
        this.time = 0;
        this.animate();
        this.setupResizeHandler();
    }

    createScene() {
        this.scene = new THREE.Scene();
        
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        
        this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
        
        // Оптимальная позиция камеры (увеличена дистанция из-за большего радиуса)
        if (this.isMobile) {
            this.camera.position.z = 15; // Увеличено с 13
        } else {
            this.camera.position.z = 16; // Увеличено с 14
        }
        
        // Рендерер
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true
        });
        this.renderer.setSize(width, height);
        
        // На мобилках используем фиксированный pixel ratio для толстых линий
        if (this.isMobile) {
            this.renderer.setPixelRatio(1);
        } else {
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }
        
        this.renderer.setClearColor(0x000000, 0);
        
        const globeContainer = this.container.querySelector('.globe-container');
        globeContainer.appendChild(this.renderer.domElement);
    }

    createGlobe() {
        this.globeGroup = new THREE.Group();
        
        // Горизонтальные линии
        this.createHorizontalLines();
        
        // Вертикальные линии
        this.createVerticalLines();
        
        // Экватор
        this.createEquator();
        
        this.scene.add(this.globeGroup);
    }

    createHorizontalLines() {
        const group = new THREE.Group();
        // Количество горизонтальных линий
        const numLines = this.isMobile ? 16 : GLOBE_CONFIG.linesCount;
        
        for (let i = 1; i < numLines; i++) {
            const phi = Math.asin(-1 + 2 * i / numLines);
            const radiusAtLatitude = GLOBE_CONFIG.sphereRadius * Math.cos(phi);
            const height = GLOBE_CONFIG.sphereRadius * Math.sin(phi);
            
            const points = [];
            // Количество сегментов в линии
            const segments = this.isMobile ? 48 : 72;
            
            for (let j = 0; j <= segments; j++) {
                const theta = (j / segments) * Math.PI * 2;
                const x = radiusAtLatitude * Math.cos(theta);
                const z = radiusAtLatitude * Math.sin(theta);
                points.push(new THREE.Vector3(x, height, z));
            }
            
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            // Настройки материала
            const opacity = this.isMobile ? 0.9 : GLOBE_CONFIG.wireframeOpacity;
            const material = new THREE.LineBasicMaterial({
                color: GLOBE_CONFIG.wireframeColor,
                transparent: true,
                opacity: opacity
            });
            
            group.add(new THREE.Line(geometry, material));
        }
        
        this.globeGroup.add(group);
    }

    createVerticalLines() {
        const group = new THREE.Group();
        // Количество вертикальных линий - 16 на мобилках, 24 на десктопе
        const numLines = this.isMobile ? 16 : GLOBE_CONFIG.linesCount;
        
        for (let i = 0; i < numLines; i++) {
            const theta = (i / numLines) * Math.PI * 2;
            const points = [];
            // Количество сегментов в линии
            const segments = this.isMobile ? 36 : 48;
            
            for (let j = 0; j <= segments; j++) {
                const phi = (j / segments) * Math.PI - Math.PI / 2;
                const x = GLOBE_CONFIG.sphereRadius * Math.cos(phi) * Math.cos(theta);
                const y = GLOBE_CONFIG.sphereRadius * Math.sin(phi);
                const z = GLOBE_CONFIG.sphereRadius * Math.cos(phi) * Math.sin(theta);
                points.push(new THREE.Vector3(x, y, z));
            }
            
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            // Настройки материала
            const opacity = this.isMobile ? 0.9 : GLOBE_CONFIG.wireframeOpacity;
            const material = new THREE.LineBasicMaterial({
                color: GLOBE_CONFIG.wireframeColor,
                transparent: true,
                opacity: opacity
            });
            
            group.add(new THREE.Line(geometry, material));
        }
        
        this.globeGroup.add(group);
    }

    createEquator() {
        const points = [];
        const segments = this.isMobile ? 80 : 144;
        
        for (let i = 0; i <= segments; i++) {
            const theta = (i / segments) * Math.PI * 2;
            const x = GLOBE_CONFIG.sphereRadius * Math.cos(theta);
            const z = GLOBE_CONFIG.sphereRadius * Math.sin(theta);
            points.push(new THREE.Vector3(x, 0, z));
        }
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        // Экватор всегда яркий
        const opacity = this.isMobile ? 1.0 : GLOBE_CONFIG.equatorOpacity;
        const material = new THREE.LineBasicMaterial({
            color: GLOBE_CONFIG.equatorColor,
            transparent: true,
            opacity: opacity
        });
        
        this.globeGroup.add(new THREE.Line(geometry, material));
    }

    setupLighting() {
        // Интенсивность света
        const ambientIntensity = this.isMobile ? 0.7 : 0.6;
        const directionalIntensity = this.isMobile ? 0.5 : 0.4;
        
        const ambientLight = new THREE.AmbientLight(0xffffff, ambientIntensity);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, directionalIntensity);
        directionalLight.position.set(10, 5, 10);
        this.scene.add(directionalLight);
    }

    hideLoading() {
        setTimeout(() => {
            this.loadingElement.style.opacity = '0';
            setTimeout(() => {
                this.loadingElement.style.display = 'none';
            }, 300);
        }, 500);
    }

    setupResizeHandler() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const width = this.container.clientWidth;
                const height = this.container.clientHeight;
                
                this.camera.aspect = width / height;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(width, height);
                
                const wasMobile = this.isMobile;
                this.isMobile = window.innerWidth <= 768;
                
                // Обновляем pixel ratio
                if (this.isMobile) {
                    this.renderer.setPixelRatio(1);
                } else {
                    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                }
                
                // Если изменился режим, пересоздаем глобус
                if (wasMobile !== this.isMobile) {
                    // Обновляем позицию камеры с увеличенными значениями
                    this.camera.position.z = this.isMobile ? 15 : 16;
                    
                    // Пересоздаем глобус с новыми настройками
                    this.scene.remove(this.globeGroup);
                    this.createGlobe();
                    this.globeGroup.rotation.x = GLOBE_CONFIG.tiltAngle;
                }
            }, 250);
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        this.time += 0.01;
        
        // Скорость вращения
        const rotationSpeed = this.isMobile ? 0.0004 : GLOBE_CONFIG.rotationSpeed;
        this.globeGroup.rotation.y += rotationSpeed;
        
        // Эффект пульсации
        const pulse = Math.sin(this.time * 1.5) * 0.002;
        
        // Обновляем прозрачность всех линий
        this.globeGroup.children.forEach(group => {
            if (group.children) {
                group.children.forEach(line => {
                    if (line.material && line.material.opacity) {
                        // Базовая прозрачность зависит от типа устройства
                        const isEquator = group === this.globeGroup.children[2];
                        const baseOpacity = isEquator ? 
                            (this.isMobile ? 1.0 : GLOBE_CONFIG.equatorOpacity) : 
                            (this.isMobile ? 0.9 : GLOBE_CONFIG.wireframeOpacity);
                        
                        const newOpacity = baseOpacity + pulse;
                        // Ограничиваем значения
                        line.material.opacity = Math.max(baseOpacity - 0.1, Math.min(1.0, newOpacity));
                    }
                });
            }
        });
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Инициализация
window.addEventListener('load', () => {
    setTimeout(() => {
        try {
            new WireframeGlobe('#web-hero-globe');
        } catch (error) {
            console.error('Ошибка инициализации глобуса:', error);
            const container = document.querySelector('#web-hero-globe');
            if (container) {
                const loading = container.querySelector('.globe-loading');
                if (loading) {
                    loading.textContent = 'Ошибка загрузки 3D глобуса';
                    loading.style.color = '#ff6b6b';
                }
            }
        }
    }, 100);
});

// Fallback для браузеров без поддержки WebGL
if (!window.WebGLRenderingContext) {
    document.addEventListener('DOMContentLoaded', () => {
        const container = document.querySelector('#web-hero-globe');
        if (container) {
            const loading = container.querySelector('.globe-loading');
            if (loading) {
                loading.textContent = '3D глобус не поддерживается в вашем браузере';
                loading.style.color = '#ffa500';
            }
        }
    });
}