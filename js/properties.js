
/*
  LONAR PROPERTY DATA

  Add/replace scenes here as you build the tour.
  The viewer itself does not need to be changed when you add scenes.

  Each scene:
    id       = unique internal ID
    group    = section shown in the scene navigation
    name     = name shown to the visitor
    images   = Wix-hosted 25% / 50% / 100% image URLs
    hotspots = directional navigation arrows
*/

const TEST_LOW =
  "https://static.wixstatic.com/media/e01935_a4ca69bca0fa499e871897cb8bd0e284~mv2.jpg";

const TEST_MED =
  "https://static.wixstatic.com/media/e01935_6491b7cc9a7c48d0a374947230afda1d~mv2.jpg";

const TEST_HIGH =
  "https://static.wixstatic.com/media/e01935_869b0100fcb84414883aa13be381e4f8~mv2.jpg";

export const PROPERTIES = [
  {
    id: "250-v1",
    size: "250 Sq. Yd.",
    variant: "Variant 1",
    scenes: [
      {
        id: "250-v1-test",
        group: "Interior",
        name: "Kitchen — Test Scene",
        images: {
          low: TEST_LOW,
          medium: TEST_MED,
          high: TEST_HIGH
        },
        hotspots: []
      }
    ]
  },

  {
    id: "250-v2",
    size: "250 Sq. Yd.",
    variant: "Variant 2",
    scenes: []
  },

  {
    id: "500-v1",
    size: "500 Sq. Yd.",
    variant: "Variant 1",
    scenes: []
  },

  {
    id: "500-v2",
    size: "500 Sq. Yd.",
    variant: "Variant 2",
    scenes: []
  },

  {
    id: "1000-v1",
    size: "1000 Sq. Yd.",
    variant: "Variant 1",
    scenes: []
  },

  {
    id: "1000-v2",
    size: "1000 Sq. Yd.",
    variant: "Variant 2",
    scenes: []
  }
];

export function getProperty(id) {
  return PROPERTIES.find(property => property.id === id) || null;
}
