const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

const genKey = (size = 1) => {
  key = ""

  while(true) {
    key += Math.random().toString(36)

    if(key.length >= size) {
      break;
    }
  }

  return key;
}

describe("deterministicPartitionKey", () => {
  describe("when no input is given", () => {
    it("returns the literal '0'", () => {
      const trivialKey = deterministicPartitionKey();
      expect(trivialKey).toBe("0");
    });
  })

  describe("when partition key is given", () => {
    const randomText = genKey(256);

    describe("when partition key is a string", () => {
      describe("when partition key length is below 256", () => {
        it("returns the partition key itself", () => {
          const event = { partitionKey: genKey() } 
          const partitionKey = deterministicPartitionKey(event);
          expect(partitionKey).toBe(event.partitionKey);
        });
      });

      describe("when partition key length is above 256", () => {
        it("returns the sha3-512 for the given key", () => {
          const partitionKey = randomText;
          const event = { partitionKey };
          const resultHashKey = crypto.createHash("sha3-512").update(partitionKey).digest("hex");
          const hashKey = deterministicPartitionKey(event);
          expect(hashKey).toBe(resultHashKey);
        })
      })
    })

    describe("when partition key is not a string", () => {
      describe("when partition key length is above 256", () => {
        it("returns the partition key itself", () => {
          const event = { partitionKey: { key: randomText } } 
          const hash = deterministicPartitionKey(event);
          const resultHash = crypto.createHash("sha3-512").update(JSON.stringify(event.partitionKey)).digest("hex");
          expect(hash).toBe(resultHash);
        });
      })

      describe("when partition key length is below 256", () => {
        it("returns the sha3-512 for the given key", () => {
          const event = { partitionKey: {} }
          const partitionKey = deterministicPartitionKey(event);
          expect(partitionKey).toBe(JSON.stringify(event.partitionKey))
        });
      })
    })

  })
});
