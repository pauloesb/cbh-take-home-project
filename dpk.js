const crypto = require("crypto");

const createHashKey = (data) => {
 return crypto.createHash("sha3-512").update(data).digest("hex");
}

const checkPartitionKey = (event) => {
  const { partitionKey } = event;
  if (partitionKey) {
    return partitionKey;
  }

  const data = JSON.stringify(event);

  return createHashKey(data);
}

const stringifyCandidate = (candidate) => {
  if (typeof candidate !== "string") {
    return JSON.stringify(candidate);
  }

  return candidate;
}

const hashCandidate = (candidate) => {
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    return createHashKey(candidate);
  }

  return candidate;
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  if(!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  const candidate = checkPartitionKey(event);
  const stringifiedCandidate = stringifyCandidate(candidate);

  return hashCandidate(stringifiedCandidate);
};

