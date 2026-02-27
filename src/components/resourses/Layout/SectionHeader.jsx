import { motion } from "framer-motion";
import { Group, Title, Text } from "@mantine/core";

const SectionHeader = ({
  eyebrow,
  title,
  description,
  action,
  align = "left",
}) => {
  return (
    <Group position="apart" align="flex-end" noWrap={false} sx={{ marginBottom: "1.25rem" }}>
      <div style={{ maxWidth: 760 }}>
        {eyebrow ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.3rem 0.85rem",
                borderRadius: "9999px",
                background: "rgba(116, 242, 206, 0.08)",
                border: "1px solid rgba(116, 242, 206, 0.25)",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--accent-secondary)",
                marginBottom: "0.75rem",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--accent-secondary)",
                  boxShadow: "0 0 6px var(--accent-secondary)",
                  flexShrink: 0,
                }}
              />
              {eyebrow}
            </span>
          </motion.div>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <Title
            order={2}
            align={align}
            sx={{ lineHeight: 1.15, fontSize: "clamp(1.5rem, 2.8vw, 2.4rem)" }}
          >
            {title}
          </Title>
        </motion.div>

        {description ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Text color="dimmed" mt={8} sx={{ maxWidth: 620 }}>
              {description}
            </Text>
          </motion.div>
        ) : null}
      </div>

      {action || null}
    </Group>
  );
};

export default SectionHeader;
