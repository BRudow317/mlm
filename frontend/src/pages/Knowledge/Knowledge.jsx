import React from "react";
import { useTheme } from "../../themes/ThemeContext";
import PageSection from "../../components/PageSection/PageSection";
import { MlmLogo } from "../../assets";

const knowledgeHighlights = [
  {
    title: "Field Notes",
    body:
      "Capture what’s working on each jobsite, from groundwater observations to crew call-outs, so every follow-up visit starts informed.",
  },
  {
    title: "Safety & Standards",
    body:
      "Daily checklists, tool inspections, and emergency contacts keep crews accountable and ready for whatever the day presents.",
  },
  {
    title: "Community Tips",
    body:
      "Share favorite supplier contacts, permit reminders, or quick win photos so new team members see precedent for excellence.",
  },
];

const highlightCardStyle = {
  border: "1px solid rgba(255, 255, 255, 0.35)",
  borderRadius: "1rem",
  padding: "1.25rem",
  background: "rgba(12, 15, 35, 0.75)",
  boxShadow: "0 12px 30px rgba(5, 6, 17, 0.65)",
};

const highlightGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "1rem",
};

const Knowledge = () => {
  const { theme } = useTheme();

  return (
    <PageSection
      heading="Knowledge Page"
      subtitle="Centralized tips, safety notes, and campfire reminders from Miller Land Management."
    >
      <p style={{ margin: 0, lineHeight: 1.8 }}>
        Thanks for visiting the technical brief for the Miller Land Management team.
        Use this page as quick reference for standards, reminders, and links you
        want every crew member to share when they head out.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          fontSize: "0.95rem",
        }}
      >
        <span>
          <strong>Current Site Theme:</strong> {theme}
        </span>
        <span style={{ opacity: 0.85 }}>
          Floating notes get pinned at the next supervisor sync—feel free to drop
          updates here.
        </span>
      </div>

      <div style={highlightGridStyle}>
        {knowledgeHighlights.map((item) => (
          <article key={item.title} style={highlightCardStyle}>
            <h3 style={{ margin: "0 0 0.75rem 0", fontSize: "1.25rem" }}>
              {item.title}
            </h3>
            <p style={{ margin: 0, lineHeight: 1.6 }}>{item.body}</p>
          </article>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={MlmLogo}
          alt="Miller Land Management logo"
          style={{
            maxWidth: "240px",
            width: "100%",
            height: "auto",
            borderRadius: "0.75rem",
            boxShadow: "0 10px 30px rgba(0,0,0,0.55)",
          }}
        />
      </div>
    </PageSection>
  );
};

export default Knowledge;
