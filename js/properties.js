export const PROPERTIES = [

  /* =====================================================
     250 SQ. YD. — DESIGN 1
     ===================================================== */

  {
    id: "250-v1",
    size: "250 Sq. Yd.",
    variant: "Design 1",

    scenes: [
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
          { yaw: 80, pitch: -5, text: "Parking", target: "250-v1-parking" },
          { yaw: 0, pitch: -5, text: "Living Room", target: "250-v1-living-room" }
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
          { yaw: -34, pitch: -5, text: "Garden", target: "250-v1-garden" },
          { yaw: -101, pitch: -5, text: "Elevation", target: "250-v1-elevation" },
          { yaw: 0, pitch: -5, text: "Pool", target: "250-v1-pool" }
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
          { yaw: 86, pitch: -5, text: "Pool", target: "250-v1-pool" },
          { yaw: 150, pitch: -5, text: "Parking", target: "250-v1-parking" }
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
          { yaw: -80, pitch: -5, text: "Garden", target: "250-v1-garden" },
          { yaw: -170, pitch: -5, text: "Parking", target: "250-v1-parking" }
        ]
      },

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
          { yaw: 0, pitch: -5, text: "Kitchen", target: "250-v1-kitchen" },
          { yaw: 172, pitch: -5, text: "Elevation", target: "250-v1-elevation" },
          { yaw: -70, pitch: -5, text: "Bedroom", target: "250-v1-bedroom" }
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
          { yaw: 130, pitch: -5, text: "Living Room", target: "250-v1-living-room" },
          { yaw: 176, pitch: -5, text: "Elevation", target: "250-v1-elevation" }
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
          { yaw: -120, pitch: -5, text: "Living Room", target: "250-v1-living-room" },
          { yaw: 20, pitch: -5, text: "Washroom", target: "250-v1-washroom" }
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
          { yaw: 140, pitch: -5, text: "Bedroom", target: "250-v1-bedroom" }
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
        hotspots: [
          { yaw: -20, pitch: -5, text: "Living Room", target: "250-v2-living-room" },
          { yaw: -126, pitch: -5, text: "Parking", target: "250-v2-parking" },
          { yaw: -175, pitch: -5, text: "Garden", target: "250-v2-garden" }
        ]
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
        hotspots: [
          { yaw: 0, pitch: -5, text: "Pool", target: "250-v2-pool" },
          { yaw: 54, pitch: -5, text: "Elevation", target: "250-v2-elevation" }
        ]
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
        hotspots: [
          { yaw: 6, pitch: -5, text: "Elevation", target: "250-v2-elevation" },
          { yaw: -60, pitch: -5, text: "Parking", target: "250-v2-parking" },
          { yaw: -11, pitch: -5, text: "Pool", target: "250-v2-pool" }
        ]
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
        hotspots: [
          { yaw: -179, pitch: -5, text: "Parking", target: "250-v2-parking" },
          { yaw: 140, pitch: -5, text: "Garden", target: "250-v2-garden" }
        ]
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
        hotspots: [
          { yaw: 0, pitch: -5, text: "Kitchen", target: "250-v2-kitchen" },
          { yaw: 90, pitch: -5, text: "Bedroom", target: "250-v2-bedroom" }
        ]
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
        hotspots: [
          { yaw: -140, pitch: -5, text: "Living Room", target: "250-v2-living-room" },
          { yaw: 179, pitch: -5, text: "Elevation", target: "250-v2-elevation" },
          { yaw: 150, pitch: -5, text: "Bedroom", target: "250-v2-bedroom" }
        ]
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
        hotspots: [
          { yaw: 70, pitch: -5, text: "Living Room", target: "250-v2-living-room" },
          { yaw: 15.5, pitch: -5, text: "Washroom", target: "250-v2-washroom" }
        ]
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
        hotspots: [
          { yaw: 160, pitch: -5, text: "Bedroom", target: "250-v2-bedroom" }
        ]
      }
    ]
  },


  /* =====================================================
     500 SQ. YD. — DESIGN 1
     ===================================================== */

  {
    id: "500-v1",
    size: "500 Sq. Yd.",
    variant: "Design 1",

    scenes: [
      {
        id: "500-v1-parking",
        group: "Exterior",
        name: "Parking",
        images: {
          low: "https://static.wixstatic.com/media/e01935_2c5d04c2f9c6472b80b1331edbccdf67~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_4e5772e9c3044c339b0a66024f387ff0~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_4b43987b943544debe7fbd1aa4d09eed~mv2.jpg"
        },
        hotspots: []
      },

      {
        id: "500-v1-elevation",
        group: "Exterior",
        name: "Elevation",
        images: {
          low: "https://static.wixstatic.com/media/e01935_21246a0e87a04c0d99136e7cc0270b98~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_a53942d26ce84e768ec1ccd4617ee15a~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_9799d6f674404b9995d604193ab3de55~mv2.jpg"
        },
        hotspots: []
      },

      {
        id: "500-v1-garden",
        group: "Exterior",
        name: "Garden",
        images: {
          low: "https://static.wixstatic.com/media/e01935_3f6ea21ca1ec40999ed2c449c78f03d0~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_4a5958867aa3419c9c7c1a2ebce2ed75~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_f81013ac2f3a45579ff282c99803a190~mv2.jpg"
        },
        hotspots: []
      },

      {
        id: "500-v1-pool",
        group: "Exterior",
        name: "Pool",
        images: {
          low: "https://static.wixstatic.com/media/e01935_0c6dab3207e8484ca804f5538bc4a1e8~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_903dd2ddfc6b4b768bcb9f0b851a5b97~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_a0da188e741245eba24bc5281346ef18~mv2.jpg"
        },
        hotspots: []
      },

      {
        id: "500-v1-living-room",
        group: "Interior",
        name: "Living Room",
        images: {
          low: "https://static.wixstatic.com/media/e01935_4198404658764656a628c07cd1b75acd~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_e4758fb2631641a7a7559aa5106d8b6f~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_5a88f22f070549a6b7af0a17288aced0~mv2.jpg"
        },
        hotspots: []
      },

      {
        id: "500-v1-washroom",
        group: "Interior",
        name: "Washroom",
        images: {
          low: "https://static.wixstatic.com/media/e01935_45366002b4c746ff8cb5bcdeefae6320~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_0918cdd207e5475ebd67836542fd1326~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_00fce230bb7c4024806c7ba830739cf4~mv2.jpg"
        },
        hotspots: []
      },

      {
        id: "500-v1-living-room-2",
        group: "Interior",
        name: "Living Room 2",
        images: {
          low: "https://static.wixstatic.com/media/e01935_dbae651d31094b019e966ffdc3befd3a~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_39d12751a1084445ae2dbf6ecc9f4f3f~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_10978875bb1b4e0584b08829c3de7f3d~mv2.jpg"
        },
        hotspots: []
      },

      {
        id: "500-v1-bedroom",
        group: "Interior",
        name: "Bedroom",
        images: {
          low: "https://static.wixstatic.com/media/e01935_25372baf7b7e41538333a063fe4a9efb~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_f0b0fdbc78734e3f806858a809823843~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_96753c0bc6fe4130973884d75215a13e~mv2.jpg"
        },
        hotspots: []
      },

      {
        id: "500-v1-kitchen",
        group: "Interior",
        name: "Kitchen",
        images: {
          low: "https://static.wixstatic.com/media/e01935_9932cc97cca64948a93b67a02bb2fe7c~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_a2d7bdac4c0843df9b04e22bdeca40ed~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_0bc61e7fc139444fba02763ea337929b~mv2.jpg"
        },
        hotspots: []
      }
    ]
  },


  /* =====================================================
     500 SQ. YD. — DESIGN 2
     ===================================================== */

  {
    id: "500-v2",
    size: "500 Sq. Yd.",
    variant: "Design 2",

    scenes: [
      {
        id: "500-v2-garden",
        group: "Exterior",
        name: "Garden",
        images: {
          low: "https://static.wixstatic.com/media/e01935_61069e2a3922431abe4d8f1c16181575~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_88a2f8b39e7c471dbeccef8b3bd062a3~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_71eafddcac734cb1804304877e541384~mv2.jpg"
        },
        hotspots: []
      },

      {
        id: "500-v2-pool",
        group: "Exterior",
        name: "Pool",
        images: {
          low: "https://static.wixstatic.com/media/e01935_d00b4cc43e68440eab9e14e11e04a753~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_9b8b1b55f1544e0eadb21948b96ef51b~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_f2b0534944c54e74b9e2da8600d6d517~mv2.jpg"
        },
        hotspots: []
      },

      {
        id: "500-v2-parking",
        group: "Exterior",
        name: "Parking",
        images: {
          low: "https://static.wixstatic.com/media/e01935_b962ffcb871a43b1a488821bcafe425a~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_82b258e1a4384a0a8a0e540e7cdcb1da~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_c454a5f97ba94aa183b8072500ad2cb1~mv2.jpg"
        },
        hotspots: []
      },

      {
        id: "500-v2-elevation",
        group: "Exterior",
        name: "Elevation",
        images: {
          low: "https://static.wixstatic.com/media/e01935_b9daacff773c41d3aaaacdb3145c7072~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_0584ac3d54bf4dc696c5fee402964b61~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_eb3a756b4bc14f9aaa96d42cdd2c9c36~mv2.jpg"
        },
        hotspots: []
      },

      {
        id: "500-v2-bedroom",
        group: "Interior",
        name: "Bedroom",
        images: {
          low: "https://static.wixstatic.com/media/e01935_a42dffcbf5c64519a0af96a1d2bf27b1~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_8241ba452e514883b1b30ecff835f21d~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_35fa18b8b5aa49d5bb325a20a6bb8965~mv2.jpg"
        },
        hotspots: []
      },

      {
        id: "500-v2-living-room",
        group: "Interior",
        name: "Living Room",
        images: {
          low: "https://static.wixstatic.com/media/e01935_7071b4c779494f5db6dc67d8645ed06f~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_3c4c4cf216b34211b2ef0abdcf6c4683~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_f177835757e7482bacdee056627a0417~mv2.jpg"
        },
        hotspots: []
      },

      {
        id: "500-v2-kitchen",
        group: "Interior",
        name: "Kitchen",
        images: {
          low: "https://static.wixstatic.com/media/e01935_204c497ecd10490290e9a3c128ec1453~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_eb71a83cc05c4b41afa7761abc06e3bb~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_bfeba513dd6a4d11ab38afff2e694013~mv2.jpg"
        },
        hotspots: []
      },

      {
        id: "500-v2-washroom",
        group: "Interior",
        name: "Washroom",
        images: {
          low: "https://static.wixstatic.com/media/e01935_20fadf20175f44239cc423be24a99db1~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_98861dfc9fdd40df84a729cbecb7490c~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_84ec82070ac14920a71ac8fd8fab3ff7~mv2.jpg"
        },
        hotspots: []
      },

      {
        id: "500-v2-living-room-2",
        group: "Interior",
        name: "Living Room 2",
        images: {
          low: "https://static.wixstatic.com/media/e01935_26a2c4d078ae4c4daaefb447b69d71f6~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_387b3c78e08a4f91b6fa81137bfa6926~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_bfdfac9c52f945898671473015943ff8~mv2.jpg"
        },
        hotspots: []
      }
    ]
  },


  /* =====================================================
     1000 SQ. YD. — DESIGN 1
     ===================================================== */

  {
    id: "1000-v1",
    size: "1000 Sq. Yd.",
    variant: "Design 1",

    scenes: [
      {
        id: "1000-v1-parking",
        group: "Exterior",
        name: "Parking",
        images: {
          low: "https://static.wixstatic.com/media/e01935_f9ffe06363144e009aad1766183fa773~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_d791253cd24a4193aeffd8face4a4af9~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_9a2a57d336f94140818926a249568fef~mv2.jpg"
        },
        hotspots: []
      },

      {
        id: "1000-v1-entrance",
        group: "Exterior",
        name: "Entrance",
        images: {
          low: "https://static.wixstatic.com/media/e01935_37abd244e7ac46938f54b584f719a0c4~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_ed0257f7f6f64bd5ae17be9254aaf3a3~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_1016a2a347f24aeba288051c2cc5375d~mv2.jpg"
        },
        hotspots: []
      },

      {
        id: "1000-v1-garden",
        group: "Exterior",
        name: "Garden",
        images: {
          low: "https://static.wixstatic.com/media/e01935_fdaf5761a16248158ede53148e00570e~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_1db04c12cf0049c5a711e4d8f88fdf40~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_7ce86f91924c4a4685095cd0f4cd1841~mv2.jpg"
        },
        hotspots: []
      },

      {
        id: "1000-v1-pool",
        group: "Exterior",
        name: "Pool",
        images: {
          low: "https://static.wixstatic.com/media/e01935_8f447f5ce1a4407985cf8df5283250da~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_8570151a767944b0bf844cf676d517b4~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_04ef88e450e04feaa32d788370580b83~mv2.jpg"
        },
        hotspots: []
      },

      {
        id: "1000-v1-living-room",
        group: "Interior",
        name: "Living Room",
        images: {
          low: "https://static.wixstatic.com/media/e01935_41e8bb23c82f4976a42196a95fbeb4ae~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_5f745b3b00484eb3937a296959b2895d~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_b9f508822bcc4f8c9b7d5c22449bf0f5~mv2.jpg"
        },
        hotspots: []
      },

      {
        id: "1000-v1-hallway",
        group: "Interior",
        name: "Hallway",
        images: {
          low: "https://static.wixstatic.com/media/e01935_e27b29fe611d4e95b7a9b89a5a09049b~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_11e67b50b9a24f70a81b1f8b107975e6~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_f4fc1626e81c4b348a8ae46c7f1d5126~mv2.jpg"
        },
        hotspots: []
      },

      {
        id: "1000-v1-bedroom",
        group: "Interior",
        name: "Bedroom",
        images: {
          low: "https://static.wixstatic.com/media/e01935_ccd09befd1f349668037c872a95b1bfb~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_63c69b2a37544e569b563f883fb4e730~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_1ff601a80c15424fb850d637baa59b44~mv2.jpg"
        },
        hotspots: []
      },

      {
        id: "1000-v1-bathroom",
        group: "Interior",
        name: "Bathroom",
        images: {
          low: "https://static.wixstatic.com/media/e01935_c5159bde001642c1a06c945f53965c50~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_dfce19ab2ded43dc97dd589051bf21bd~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_93b853715951415c85fd9c06a6d214fe~mv2.jpg"
        },
        hotspots: []
      },

      {
        id: "1000-v1-kitchen",
        group: "Interior",
        name: "Kitchen",
        images: {
          low: "https://static.wixstatic.com/media/e01935_8b2cb3f9309e49b2959ca578302afacd~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_204c2ff4b27d4630b33fd507c80d649f~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_008d4eca3adc48a7ba16819335bc6593~mv2.jpg"
        },
        hotspots: []
      }
    ]
  },


  /* =====================================================
     1000 SQ. YD. — DESIGN 2
     ===================================================== */

  {
    id: "1000-v2",
    size: "1000 Sq. Yd.",
    variant: "Design 2",

    scenes: [
      {
        id: "1000-v2-parking",
        group: "Exterior",
        name: "Parking",
        images: {
          low: "https://static.wixstatic.com/media/e01935_29e151ffe7ec4f629aed60f68c31354d~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_018e10ad06954bff8c299a80be8d1ccd~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_df19e4e450ec4757b9f88da514edf81f~mv2.jpg"
        },
        hotspots: []
      },

      {
        id: "1000-v2-entrance",
        group: "Exterior",
        name: "Entrance",
        images: {
          low: "https://static.wixstatic.com/media/e01935_8f1ed70abac84c7c9a2fe8dd51849590~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_798c6b6896d14f249a2d15154a5cef5a~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_40941ffeba154eba8974359f5692822f~mv2.jpg"
        },
        hotspots: []
      },

      {
        id: "1000-v2-pool",
        group: "Exterior",
        name: "Pool",
        images: {
          low: "https://static.wixstatic.com/media/e01935_a3b1cf5fef614994ae418a3857c606a7~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_bc69c375205d40a59e3d5b7e94e394f2~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_c9e1ea58c2884d6f852405f4dbb87482~mv2.jpg"
        },
        hotspots: []
      },

      {
        id: "1000-v2-garden",
        group: "Exterior",
        name: "Garden",
        images: {
          low: "https://static.wixstatic.com/media/e01935_f5bad4e100d245bfb2856534e346e09a~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_43712b7c50434f4e84aef16a1431b20d~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_9733757712664428a7ccb650b86dc565~mv2.jpg"
        },
        hotspots: []
      },

      {
        id: "1000-v2-living-room",
        group: "Interior",
        name: "Living Room",
        images: {
          low: "https://static.wixstatic.com/media/e01935_88a1ac6cb085492bb6f4f3c8ba46e842~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_70036e93c0bd4a15a8571ed8fab8791c~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_9c23095d644a4c5d9f255e1fa6eba205~mv2.jpg"
        },
        hotspots: []
      },

      {
        id: "1000-v2-hallway",
        group: "Interior",
        name: "Hallway",
        images: {
          low: "https://static.wixstatic.com/media/e01935_62869076b47f46bfaa51b03ad87bce51~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_e88288e315524a2d8411128beb1433a7~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_b73c414734f24feea16b04ce42d39fc8~mv2.jpg"
        },
        hotspots: []
      },

      {
        id: "1000-v2-bedroom",
        group: "Interior",
        name: "Bedroom",
        images: {
          low: "https://static.wixstatic.com/media/e01935_4c6d34c829f64405a1479760a10026ea~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_14551184a9f142fa94b9de770874ae19~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_efc9ecbe29cc4e1797f00cea039aaa8c~mv2.jpg"
        },
        hotspots: []
      },

      {
        id: "1000-v2-bathroom",
        group: "Interior",
        name: "Bathroom",
        images: {
          low: "https://static.wixstatic.com/media/e01935_103fb8da838b4f76a08ecda5cb8de5f5~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_65a5ecd3226648cf84fb25cb367e0e2b~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_418577763aa14efe9d463988554c5297~mv2.jpg"
        },
        hotspots: []
      },

      {
        id: "1000-v2-home-theatre",
        group: "Interior",
        name: "Home Theatre",
        images: {
          low: "https://static.wixstatic.com/media/e01935_8a8d941144f14c0681855e5051a4d101~mv2.jpg",
          medium: "https://static.wixstatic.com/media/e01935_e74f6dcadcd94fe798d16a017c3d129a~mv2.jpg",
          high: "https://static.wixstatic.com/media/e01935_b5653177a6ac4888bf17562029df5d19~mv2.jpg"
        },
        hotspots: []
      }
    ]
  }

];


/* =====================================================
   PROPERTY HELPER
   ===================================================== */

export function getProperty(id) {
  return (
    PROPERTIES.find(
      property => property.id === id
    ) || null
  );
}
