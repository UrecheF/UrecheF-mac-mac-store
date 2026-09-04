# Rollback strategy

Until merge, rollback is simply abandoning the feature branch. After eventual integration, keep the merge isolated so reverting the storefront expansion does not revert catalog/API fixes or unrelated production work.
