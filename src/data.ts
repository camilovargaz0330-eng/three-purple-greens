/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, UpcomingEvent } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Purple Nebula Special Cut',
    category: 'cepa',
    categoryLabel: 'Cepa de Cannabis',
    description: 'Una selección exclusiva cultivada con espectro lumínico específico para acentuar sus profundos tonos morados y aroma a frutos del bosque. Sus tricomas relucientes contienen una potencia inigualable.',
    shortDescription: 'Híbrido Premium con notas a lavanda, uva dulce e incienso.',
    price: 65.00,
    rating: 4.9,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5hWUdOx6pSiGjoo_gF6V28aha6U2_XcUQhcaXhixTd4aPi9Ob6ZqzdvJx1L_2rSh0mKROP-THnCz26LumdbNpGsFXfELb-LcCuAKUjmW62Dcx7JH4cYdtox8aN3AfA1_4zbwq774X2QGH8vOaLlqkzVOY9v_v_8f9HBea5zbCCCXixwRUYDeN-dvOD_jAdZK-ER6FuA39UpGe7yZs12Eh9iWYLLJtk3e_VXWauAqCyqI6m2bUYiwofPJr_uV94YlKYJ1EprP7zxsB',
    thc: '26%',
    cbd: '1.2%',
    terpenes: ['Mirceno', 'Cariofileno', 'Linalool'],
    effects: ['Relajación Profunda', 'Euforia Creativa', 'Alivio Corporal'],
    sizeOrWeight: '3.5g'
  },
  {
    id: 'p2',
    name: 'Emerald Aurora Sativa',
    category: 'cepa',
    categoryLabel: 'Cepa de Cannabis',
    description: 'Cruzamiento energético que despierta la mente y agudiza el enfoque. Flores brillantes y esponjosas cubiertas de pistilos anaranjados y resina cítrica limpia.',
    shortDescription: 'Sativa dominante con perfiles cítricos súper frescos.',
    price: 58.00,
    rating: 4.8,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5hWUdOx6pSiGjoo_gF6V28aha6U2_XcUQhcaXhixTd4aPi9Ob6ZqzdvJx1L_2rSh0mKROP-THnCz26LumdbNpGsFXfELb-LcCuAKUjmW62Dcx7JH4cYdtox8aN3AfA1_4zbwq774X2QGH8vOaLlqkzVOY9v_v_8f9HBea5zbCCCXixwRUYDeN-dvOD_jAdZK-ER6FuA39UpGe7yZs12Eh9iWYLLJtk3e_VXWauAqCyqI6m2bUYiwofPJr_uV94YlKYJ1EprP7zxsB',
    thc: '22%',
    cbd: '0.8%',
    terpenes: ['Limoneno', 'Pineno', 'Humuleno'],
    effects: ['Energizante', 'Foco Claro', 'Sociabilidad'],
    sizeOrWeight: '3.5g'
  },
  {
    id: 'p3',
    name: 'Viper Kush Estate Reserve',
    category: 'cepa',
    categoryLabel: 'Cepa de Cannabis',
    description: 'La cepa nocturna definitiva. Aromas terrosos profundos, pino silvestre y notas gaseosas que sumergen el cuerpo en un estado de tranquilidad absoluta y restauración.',
    shortDescription: 'Indica pura y terrosa para restaurar el ritmo del sueño.',
    price: 62.00,
    rating: 4.9,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5hWUdOx6pSiGjoo_gF6V28aha6U2_XcUQhcaXhixTd4aPi9Ob6ZqzdvJx1L_2rSh0mKROP-THnCz26LumdbNpGsFXfELb-LcCuAKUjmW62Dcx7JH4cYdtox8aN3AfA1_4zbwq774X2QGH8vOaLlqkzVOY9v_v_8f9HBea5zbCCCXixwRUYDeN-dvOD_jAdZK-ER6FuA39UpGe7yZs12Eh9iWYLLJtk3e_VXWauAqCyqI6m2bUYiwofPJr_uV94YlKYJ1EprP7zxsB',
    thc: '24%',
    cbd: '2.0%',
    terpenes: ['Terpinoleno', 'Mirceno', 'Beta-Pineno'],
    effects: ['Sedación Suave', 'Paz Mental', 'Alivio Muscular'],
    sizeOrWeight: '3.5g'
  },
  {
    id: 'p4',
    name: 'TPG Soothing Wellness Balm',
    category: 'topico',
    categoryLabel: 'Tópico de Cannabis',
    description: 'Bálsamo ultra-absorbente formulado para deportistas y personas activas. Contiene extracto de espectro completo, árnica de montaña, aceites esenciales de eucalipto y menta piperina.',
    shortDescription: 'Crema regeneradora corporal hidratante y refrescante.',
    price: 45.00,
    rating: 4.7,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcwO9p7KM2NCiSmqk66HFhstS8HnZfZSl6vLILAY0qbWUtCHvo7dRHJl-bc9UvIvU0Y65qxDxObjhO4zfDWPgUe3llyWKnh7ETohAetiohvnuSFBWjgURob4SjbsKUaaEDwShUBcQSuU4wf3a5ynWAnOVSDqfsSVE5dK3HjZ1r-5rigvCmwn100vFDQ9SEy6I1FM4glS3VJzUcD4X9BUBnZopU4i0QHRZvABnnPkZbq_OwL75GPuIu5cYxHQPtzVl7XGyJFyUxCn6o',
    cbd: '1500mg',
    thc: 'Menos del 0.3%',
    terpenes: ['Eucaliptol', 'Limoneno'],
    effects: ['Desinflamatorio', 'Refrescante', 'Alivio de Articulaciones'],
    sizeOrWeight: '60ml'
  },
  {
    id: 'p5',
    name: 'Pure Violet Serum Relief',
    category: 'topico',
    categoryLabel: 'Tópico de Cannabis',
    description: 'Suero facial y de sienes hidratante concentrado. Combina CBD destilado puro, ácido hialurónico y extractos botánicos de lavanda y rosa mosqueta para restaurar la luminosidad y calmar la tensión del día.',
    shortDescription: 'Suero calmante premium para sienes y rostro.',
    price: 49.00,
    rating: 4.8,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcwO9p7KM2NCiSmqk66HFhstS8HnZfZSl6vLILAY0qbWUtCHvo7dRHJl-bc9UvIvU0Y65qxDxObjhO4zfDWPgUe3llyWKnh7ETohAetiohvnuSFBWjgURob4SjbsKUaaEDwShUBcQSuU4wf3a5ynWAnOVSDqfsSVE5dK3HjZ1r-5rigvCmwn100vFDQ9SEy6I1FM4glS3VJzUcD4X9BUBnZopU4i0QHRZvABnnPkZbq_OwL75GPuIu5cYxHQPtzVl7XGyJFyUxCn6o',
    cbd: '800mg',
    thc: 'Sin THC',
    terpenes: ['Linalool', 'Geraniol'],
    effects: ['Calma Tensión', 'Antioxidante', 'Nutrición Profunda'],
    sizeOrWeight: '30ml'
  },
  {
    id: 'p6',
    name: 'Golden Sun Live Rosin',
    category: 'extracto',
    categoryLabel: 'Extracto de Cannabis',
    description: 'Prensa sin solventes elaborada a partir de flores recién cosechadas y congeladas al instante para capturar el perfil completo de terpenos vivos. Textura dorada, pura y cristalina como miel.',
    shortDescription: 'Extracto Live Rosin 100% puro para conocedores exigentes.',
    price: 85.00,
    rating: 5.0,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoQ5X_Nfx_8lKTkCtmJuiL4a7719ZRCRk_p6utceAmu5yKgrxDJ36t79jlwfQn0mlvxFtOoafwLeFeFXErlNJdFCoMt3xElGYcEFlWCH0oz8UG5Jpu5YNqxCS75W0DICHutth5VcNNdy9F3v5vsmLKnpX9hi-B4AMl6xLQtvZ5iGzGb3U6aJIUkPatRrbVuUz4os4fbWeRqQAkpWc6YHCGmYTf7zzXBzr2t6c4Vo1Z4I8FvS_R_RBNN9VxgM0R_x2dQiPTLzvfzgaI',
    thc: '78%',
    cbd: '4.5%',
    terpenes: ['Mirceno', 'Limoneno', 'Humuleno'],
    effects: ['Elevación Inmediata', 'Potencia Extrema', 'Sabor Excepcional'],
    sizeOrWeight: '1g'
  },
  {
    id: 'p7',
    name: 'Amethyst Sugar Wax',
    category: 'extracto',
    categoryLabel: 'Extracto de Cannabis',
    description: 'Micro-cristales brillantes suspendidos en un almíbar denso de terpenos vivos extraídos de nuestra genética exclusiva morada. Ofrece un sabor súper intenso y un golpe limpio y nítido.',
    shortDescription: 'Sugar Wax rico en terpenos con un perfil floral exquisito.',
    price: 75.00,
    rating: 4.8,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoQ5X_Nfx_8lKTkCtmJuiL4a7719ZRCRk_p6utceAmu5yKgrxDJ36t79jlwfQn0mlvxFtOoafwLeFeFXErlNJdFCoMt3xElGYcEFlWCH0oz8UG5Jpu5YNqxCS75W0DICHutth5VcNNdy9F3v5vsmLKnpX9hi-B4AMl6xLQtvZ5iGzGb3U6aJIUkPatRrbVuUz4os4fbWeRqQAkpWc6YHCGmYTf7zzXBzr2t6c4Vo1Z4I8FvS_R_RBNN9VxgM0R_x2dQiPTLzvfzgaI',
    thc: '72%',
    cbd: '2.1%',
    terpenes: ['Cariofileno', 'Linalool', 'Humuleno'],
    effects: ['Balance Físico/Mental', 'Relajación Serena', 'Claridad'],
    sizeOrWeight: '1g'
  }
];

export const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    id: 'e1',
    date: '18/06/2026',
    time: '13:00 H',
    title: 'MEDITACIÓN EN LA OSCURIDAD',
    location: 'Santuario TPG - CDMX',
    description: 'Una inmersión sensorial guiada para conectar con el bienestar corporal en la oscuridad absoluta, acompañada de aromas botánicos de pino y lavandina.',
    capacity: 25,
    registeredCount: 18,
    price: 'Entrada Libre'
  },
  {
    id: 'e2',
    date: '10/07/2026',
    time: '18:00 H',
    title: 'TERPENOS Y MARIDAJE VIP',
    location: 'Lounge Tres Moras - Guadalupe',
    description: 'Aprende a diferenciar las notas olfativas de los terpenos naturales mirceno, limoneno y linalool, e identifícalas combinadas con infusiones orgánicas.',
    capacity: 15,
    registeredCount: 12,
    price: '$500 MXN'
  },
  {
    id: 'e3',
    date: '23/08/2026',
    time: '15:00 H',
    title: 'TALLER DE BIENESTAR TPG',
    location: 'TPG Jardines - Monterrey',
    description: 'Descubre los fundamentos del sistema endocannabinoide, cómo actúan los tópicos en la piel, dosificación segura, y técnicas de automasaje desinflamatorio.',
    capacity: 40,
    registeredCount: 22,
    price: 'Entrada Libre'
  },
  {
    id: 'e4',
    date: '19/09/2026',
    time: '14:00 H',
    title: 'YOGA RESTAURATIVA & CBD',
    location: 'Estudio Holístico - CDMX',
    description: 'Sesión multinivel enfocada en estiramientos profundos y el uso asistido de tópicos calmantes para relajar articulaciones cansadas.',
    capacity: 30,
    registeredCount: 29,
    price: '$350 MXN'
  }
];
