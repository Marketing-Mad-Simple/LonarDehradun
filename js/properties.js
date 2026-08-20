export const PROPERTIES = [
  {
    id: "250-v1",
    size: "250 Sq. Yd.",
    variant: "Design 1",

    scenes: [

      /* =========================
         EXTERIOR
      ========================= */

      {
        id: "250-v1-elevation",
        group: "Exterior",
        name: "Elevation",

        images: {
          low: "https://static.wixstatic.com/media/e01935_a4ca69bca0fa499e871897cb8bd0e284~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_6491b7cc9a7c48d0a374947230afda1d~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_869b0100fcb84414883aa13be381e4f8~mv2.jpg"
        },

        hotspots: [
          {
            yaw: 80,
            pitch: -5,
            text: "Parking",
            target: "250-v1-parking"
          },
          {
            yaw: 0,
            pitch: -5,
            text: "Living Room",
            target: "250-v1-living-room"
          }
        ]
      },

      {
        id: "250-v1-parking",
        group: "Exterior",
        name: "Parking",

        images: {
          low: "https://static.wixstatic.com/media/e01935_cf08f6c2c1f04646827785ddc8832ab1~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_32e438e5fd7a4a77be3fec9a83767159~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_a2de16ba285b46a4b82c19f7e9b16034~mv2.jpg"
        },

        hotspots: [
          {
            yaw: -34,
            pitch: -5,
            text: "Garden",
            target: "250-v1-garden"
          },
          {
            yaw: -101,
            pitch: -5,
            text: "Elevation",
            target: "250-v1-elevation"
          },
          {
            yaw: 0,
            pitch: -5,
            text: "Pool",
            target: "250-v1-pool"
          }
        ]
      },

      {
        id: "250-v1-garden",
        group: "Exterior",
        name: "Garden",

        images: {
          low: "https://static.wixstatic.com/media/e01935_148bb9dc366e451a8caf981266c5c464~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_dd263bd31fbc4060b27e57227277145b~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_f62a38568a204511b6eb220947950f75~mv2.jpg"
        },

        hotspots: [
          {
            yaw: 86,
            pitch: -5,
            text: "Pool",
            target: "250-v1-pool"
          },
          {
            yaw: 150,
            pitch: -5,
            text: "Parking",
            target: "250-v1-parking"
          }
        ]
      },

      {
        id: "250-v1-pool",
        group: "Exterior",
        name: "Pool",

        images: {
          low: "https://static.wixstatic.com/media/e01935_039363cfde13480f99bc62ef7e0bb593~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_51ef5e9349f342c1b6d61cb8a6499da9~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_e6278adf2476403b857eb7fab03ef7be~mv2.jpg"
        },

        hotspots: [
          {
            yaw: -80,
            pitch: -5,
            text: "Garden",
            target: "250-v1-garden"
          },
          {
            yaw: -170,
            pitch: -5,
            text: "Parking",
            target: "250-v1-parking"
          }
        ]
      },


      /* =========================
         INTERIOR
      ========================= */

      {
        id: "250-v1-living-room",
        group: "Interior",
        name: "Living Room",

        images: {
          low: "https://static.wixstatic.com/media/e01935_1c43f62c6bbf4253bc798295adaff4c2~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_891f3ab62647483cb779d7e6de27a19e~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_920db83886e1464c909d365e7cf4cb64~mv2.jpg"
        },

        hotspots: [
          {
            yaw: 0,
            pitch: -5,
            text: "Kitchen",
            target: "250-v1-kitchen"
          },
          {
            yaw: 172,
            pitch: -5,
            text: "Elevation",
            target: "250-v1-elevation"
          },
          {
            yaw: -70,
            pitch: -5,
            text: "Bedroom",
            target: "250-v1-bedroom"
          }
        ]
      },

      {
        id: "250-v1-kitchen",
        group: "Interior",
        name: "Kitchen",

        images: {
          low: "https://static.wixstatic.com/media/e01935_8fa924a4a98c486bb94d7f8bdacea78e~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_26208ad7edb74a0794fb3976d0cccfe2~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_048a5fb17edb4fd7aa01c831c463d7f8~mv2.jpg"
        },

        hotspots: [
          {
            yaw: 130,
            pitch: -5,
            text: "Living Room",
            target: "250-v1-living-room"
          },
          {
            yaw: 176,
            pitch: -5,
            text: "Elevation",
            target: "250-v1-elevation"
          }
        ]
      },

      {
        id: "250-v1-bedroom",
        group: "Interior",
        name: "Bedroom",

        images: {
          low: "https://static.wixstatic.com/media/e01935_ec908cf543674ac9ac8daa0ba1ddb050~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_131d14df128b48e48640749c49bb9e25~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_05773f0b245c4d2896232f72931c825d~mv2.jpg"
        },

        hotspots: [
          {
            yaw: -120,
            pitch: -5,
            text: "Living Room",
            target: "250-v1-living-room"
          },
          {
            yaw: 20,
            pitch: -5,
            text: "Washroom",
            target: "250-v1-washroom"
          }
        ]
      },

      {
        id: "250-v1-washroom",
        group: "Interior",
        name: "Washroom",

        images: {
          low: "https://static.wixstatic.com/media/e01935_0c93f76e12f4404baddca8d90b28749c~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_1403361a9785483bac22cc90241d6f2d~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_e3babe286f86417cbb6567bbd29f181b~mv2.jpg"
        },

        hotspots: [
          {
            yaw: 140,
            pitch: -5,
            text: "Bedroom",
            target: "250-v1-bedroom"
          }
        ]
      }
    ]
  },


  /* =====================================================
     250 SQ. YD. — DESIGN 2
     ===================================================== */

  {
    id: "250-v2",
    size: "250 Sq. Yd.",
    variant: "Design 2",

    scenes: [

      {
        id: "250-v2-elevation",
        group: "Exterior",
        name: "Elevation",

        images: {
          low: "https://static.wixstatic.com/media/e01935_f416bef20fa84d9c8c9c57885035deaa~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_a12ec172c0cf408f98f864a6e9a0b696~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_d22cbdcaf5044fb98149b2cce47254e6~mv2.jpg"
        },

        hotspots: []
      },

      {
        id: "250-v2-parking",
        group: "Exterior",
        name: "Parking",

        images: {
          low: "https://static.wixstatic.com/media/e01935_bcd09cddff1d4e32bf18bc4b3498065a~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_8d15d9207e02498d92fc1c33f84c7c7d~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_28354831f0414b959f8ee49927f43a82~mv2.jpg"
        },

        hotspots: []
      },

      {
        id: "250-v2-garden",
        group: "Exterior",
        name: "Garden",

        images: {
          low: "https://static.wixstatic.com/media/e01935_a27100a1e547471e82a2f83fa7d14573~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_a1c9a7036fd343b983ec285cb4cac7b3~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_8ae2aef697474f1a86eeabd4c9a8170b~mv2.jpg"
        },

        hotspots: []
      },

      {
        id: "250-v2-pool",
        group: "Exterior",
        name: "Pool",

        images: {
          low: "https://static.wixstatic.com/media/e01935_212b45103de8492683016ee602857fcb~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_f8d6ed13295f4ad68c9f895b1a38f4d3~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_a7d0b4481f04454d9d9b974c07cff711~mv2.jpg"
        },

        hotspots: []
      },

      {
        id: "250-v2-living-room",
        group: "Interior",
        name: "Living Room",

        images: {
          low: "https://static.wixstatic.com/media/e01935_18927b7dbf1b42aea4443939c9ebb253~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_3abccf6749644732ae9370f60944a5c6~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_2b9ad3801c8341d182efc33e6756ee96~mv2.jpg"
        },

        hotspots: []
      },

      {
        id: "250-v2-kitchen",
        group: "Interior",
        name: "Kitchen",

        images: {
          low: "https://static.wixstatic.com/media/e01935_d9013b93400c40d2b3de46d5bef38d61~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_3ea9ed16c58e4406b107a815a79eecc0~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_18fc8987ea88407f9d915f9c459b9201~mv2.jpg"
        },

        hotspots: []
      },

      {
        id: "250-v2-bedroom",
        group: "Interior",
        name: "Bedroom",

        images: {
          low: "https://static.wixstatic.com/media/e01935_82e73b7399374a80a1786b520e7e4d2c~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_b7c37bde08654f47b88b93d698cc0cd0~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_81630298390b4f15a8d35e996d43ee12~mv2.jpg"
        },

        hotspots: []
      },

      {
        id: "250-v2-washroom",
        group: "Interior",
        name: "Washroom",

        images: {
          low: "https://static.wixstatic.com/media/e01935_87c0fe7084c64aa1931a8958dfd5214e~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_461d2279a52748508776c6d750a0d54e~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_ce514a79d93b4401b4d74b245168b84a~mv2.jpg"
        },

        hotspots: []
      }
    ]
  },


  /* =====================================================
     FUTURE PROPERTIES
     ===================================================== */

  {
    id: "500-v1",
    size: "500 Sq. Yd.",
    variant: "Design 1",
    scenes: []
  },

  {
    id: "500-v2",
    size: "500 Sq. Yd.",
    variant: "Design 2",
    scenes: []
  },

  {
    id: "1000-v1",
    size: "1000 Sq. Yd.",
    variant: "Design 1",
    scenes: []
  },

  {
    id: "1000-v2",
    size: "1000 Sq. Yd.",
    variant: "Design 2",
    scenes: []
  }
];


/* =====================================================
   PROPERTY HELPER
   ===================================================== */

export function getProperty(id) {
  return (
    PROPERTIES.find(
      property =>
        property.id === id
    ) || null
  );
}
