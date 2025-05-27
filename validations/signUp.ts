import { z } from "zod";

import email from "@/common/validation/email";
import name from "@/common/validation/name";
import password from "@/common/validation/password";
import username from "@/common/validation/username";

export default z
  .object({
    name,
    email,
    username,
    password,
  })
