"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

/**
 * A horizontal arrow-connected flow (`A → B → C`) that wraps on small
 * screens. Used for the two-stage visa flows, the "why we're different"
 * journey and the final conversion strip.
 */
export default function FlowStrip({
  items,
  onDark = false,
  highlightLast = false,
}: {
  items: string[];
  onDark?: boolean;
  highlightLast?: boolean;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        rowGap: 1.25,
      }}
    >
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <Box key={item} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              component="span"
              sx={{
                px: 2,
                py: 0.9,
                borderRadius: 999,
                fontSize: { xs: 13, md: 14.5 },
                fontWeight: 700,
                whiteSpace: "nowrap",
                bgcolor:
                  highlightLast && last
                    ? "primary.main"
                    : onDark
                      ? "rgba(255,255,255,0.08)"
                      : "#fff",
                color:
                  highlightLast && last ? "#fff" : onDark ? "rgba(255,255,255,0.85)" : "text.primary",
                border: "1px solid",
                borderColor:
                  highlightLast && last
                    ? "primary.main"
                    : onDark
                      ? "rgba(255,255,255,0.18)"
                      : "divider",
              }}
            >
              {item}
            </Typography>
            {!last && (
              <ArrowForwardRoundedIcon
                sx={{
                  fontSize: 16,
                  color: onDark ? "rgba(255,255,255,0.5)" : "primary.main",
                  flexShrink: 0,
                }}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
}
